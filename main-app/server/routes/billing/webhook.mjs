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

    fastify.post("/webhook", async (req, res) => {

        console.log("ARRIVATO AL WEBHOOK") // DEBUG LOG

        try {
            const signature = req.headers["creem-signature"];
            const rawBody = req.body;

            if (!signature) {
                return res.status(400).send("Missing signature");
            }

            if (!rawBody || !Buffer.isBuffer(rawBody)) {
                return res.status(400).send("Missing raw body");
            }

            const isValid = verifySignature(
                rawBody,
                signature,
                process.env.CREEM_WEBHOOK_SECRET
            );

            if (!isValid) {
                return res.status(400).send("Invalid signature");
            }

            const event = JSON.parse(rawBody.toString("utf-8"));

            await creem.webhooks.handleEvents(event, signature, {

                onCheckoutCompleted: async (data) => {
                    console.log("CHECKOUT COMPLETATO:", data.customer?.email); // DEBUG LOG
                },

                onGrantAccess: async (context) => {
                    console.log("ACCESSO CONSENTITO", data.metadata?.userId); // DEBUG LOG
                },

                onRevokeAccess: async (context) => {
                    console.log("⛔ ACCESSO REVOCATO", context.metadata?.userId); // DEBUG LOG
                },
            });

            res.status(200).send("OK");
        } catch (error) {
            console.error("Webhook error:", error); // DEBUG LOG
            res.status(400).send("Webhook error");
        }
    });
}