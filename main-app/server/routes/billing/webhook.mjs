import { creem } from "../../config/creem.mjs";
import { supabase } from "../../config/supabase.mjs";
import crypto from "node:crypto";

export default async function webhookRoutes(fastify) {

    fastify.addContentTypeParser(
        "application/json",
        { parseAs: "buffer" },
        (req, body, done) => {
            done(null, body);
        }
    );

    function verifySignature(rawBody, signature, secret) {
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(rawBody)
            .digest("hex");

        return crypto.timingSafeEqual(
            Buffer.from(expectedSignature),
            Buffer.from(signature)
        );
    }

    // Function to grant user access
    async function grantUserAccess({ userId, plan }) {
        try {
            if (!userId || !plan) {
                throw new Error("Missing userId or plan");
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    ispro: true,
                    pro_since: new Date(),
                    pro_type: plan.toLowerCase(),
                    pro_expiration: plan === "lifetime" ? null : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                })
                .eq("id", userId)
                .select();

            if (error) {
                throw new Error(`DB update failed: ${error.message} (code: ${error.code})`);
            }

        } catch (error) {
            console.error("grantUserAccess error: ", error);
            throw error;
        }
    }

    // Function to revoke user access
    async function revokeUserAccess({ userId }) {
        try {
            if (!userId) {
                throw new Error("Missing userId");
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    ispro: false,
                    pro_since: null,
                    pro_type: null,
                    pro_expiration: null,
                })
                .eq("id", userId)
                .select();

            if (error) {
                throw new Error(`DB update failed: ${error.message} (code: ${error.code})`);
            }

        } catch (error) {
            console.error("revokeUserAccess error: ", error);
            throw error;
        }
    }

    fastify.post("/webhook", async (request, reply) => {
        try {
            const signature = request.headers["creem-signature"];
            const rawBody = request.body;

            if (!signature || !rawBody || !Buffer.isBuffer(rawBody)) {
                return reply.status(400).send("Invalid webhook payload");
            }

            const isValid = verifySignature(
                rawBody,
                signature,
                process.env.CREEM_WEBHOOK_SECRET
            );

            if (!isValid) {
                return reply.status(400).send("Invalid signature");
            }

            await creem.webhooks.handleEvents(rawBody, signature, {

                onCheckoutCompleted: async (data) => {
                    request.log.info("Checkout completed event received");
                    const userId = data.metadata?.userId;
                    const plan = data.metadata?.plan;

                    if (plan !== "lifetime") return;

                    try {
                        await grantUserAccess({ userId, plan });
                        console.log("LIFETIME ACCESS GRANTED"); // DEBUG LOG
                    } catch (error) {
                        request.log.error("lifetime grant failed: ", error.message);
                    }
                },

                onGrantAccess: async (context) => {
                    request.log.info("Grant access event received");
                    const userId = context.metadata?.userId;
                    const plan = context.metadata?.plan;
                    if (!userId || !plan) {
                        request.log.error("Missing metadata: ", context.metadata);
                        return;
                    }
                    try {
                        await grantUserAccess({ userId, plan });
                        console.log("SUBSCRIPTION ACCESS GRANTED"); // DEBUG LOG
                    } catch (error) {
                        request.log.error("Subscription grant failed: ", error.message);
                    }
                },

                onRevokeAccess: async (context) => {
                    request.log.info("Revoke access event received");
                    const userId = context.metadata?.userId;
                    if (!userId) {
                        request.log.error("Missing userId in metadata: ", context.metadata);
                        return;
                    }
                    try {
                        await revokeUserAccess({ userId });
                        console.log("ACCESS REVOKED"); // DEBUG LOG
                    } catch (error) {
                        request.log.error("Revoke access failed: ", error.message);
                    }
                },

                onSubscriptionExpired: async (context) => {
                    request.log.info("Subscription expired event received");
                    // TODO: Inviare una notifica tramite email all'utente 
                },

                onSubscriptionCanceled: async (context) => {
                    request.log.info("Subscription canceled event received");
                    const userId = context.metadata?.userId;
                    if (!userId) {
                        request.log.error("Missing userId in metadata: ", context.metadata);
                        return;
                    }
                    try {
                        await revokeUserAccess({ userId });
                        console.log("SUBSCRIPTION CANCELED"); // DEBUG LOG
                    } catch (error) {
                        request.log.error("Revoke access failed: ", error.message);
                    }
                },

                onRefundCreated: async (context) => {
                    request.log.info("Refund created event received");
                    // TODO: Inviare una notifica tramite email a me stesso + annullare l'accesso dell'utente
                },

                onDisputeCreated: async (context) => {
                    request.log.info("Dispute created event received");
                    // TODO: Inviare una notifica tramite email a me stesso + annullare l'accesso dell'utente
                }

            });

            return reply.status(200).send("OK");
        } catch (error) {
            request.log.error("Webhook fatal error: ", error);
            return reply.status(400).send("Webhook error");
        }
    });
}