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

    fastify.post("/webhook", async (request, reply) => {
        try {
            const signature = request.headers["creem-signature"];

            const rawBody = request.body;

            if (!signature) {
                return reply.status(400).send("Missing signature");
            }

            if (!rawBody || !Buffer.isBuffer(rawBody)) {
                return reply.status(400).send("Missing raw body");
            }

            const isValid = verifySignature(
                rawBody,
                signature,
                process.env.CREEM_WEBHOOK_SECRET
            );

            if (!isValid) {
                return reply.status(400).send("Invalid signature");
            }

            const event = rawBody;

            await creem.webhooks.handleEvents(event, signature, {

                onCheckoutCompleted: async (data) => {
                    console.log("CHECKOUT COMPLETATO:", data.customer?.email); // DEBUG LOG
                },

                onGrantAccess: async (context) => {
                    console.log("ACCESSO CONSENTITO"); // DEBUG LOG
                    const userId = context.metadata?.userId;
                    const plan = context.metadata?.plan;
                    console.log("PLAN:", plan); // DEBUG LOG    
                    console.log("USER ID:", userId); // DEBUG LOG   
                    try {
                        const { error } = await supabase
                            .from('users')
                            .update({
                                is_pro: true,
                                pro_type: plan.toLowerCase(),
                            })
                            .eq('id', userId);

                        if (error) {
                            request.log.error("Error handling the DB Update", error);
                            return reply.status(500).send("Internal Server Error");
                        }
                    } catch (error) {
                        request.log.error("Error handling the Grant Access", error);
                        return reply.status(500).send("Internal Server Error");
                    }
                },

                onRevokeAccess: async (context) => {
                    console.log("ACCESSO REVOCATO", context.metadata?.userId); // DEBUG LOG
                },
            });

            return reply.status(200).send("OK");
        } catch (error) {
            request.log.error("Error handling webhook:", error);
            return reply.status(400).send("Webhook error");
        }
    });
}