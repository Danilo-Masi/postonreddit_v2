import { creem } from "../../config/creem.mjs";

export default async function webhookRoutes(fastify) {
    fastify.post("/webhook", {
        config: { rawBody: true }
    }, async (request, reply) => {
        try {
            await creem.webhooks.handleEvents(
                request.rawBody,
                request.headers["creem-signature"],
                {
                    onCheckoutCompleted: async (data) => {
                        console.log("Checkout completed:", data.customer?.email);
                    },

                    onGrantAccess: async (context) => {
                        console.log("Grant access:", context.metadata);
                        // 👉 qui aggiorni DB → ispro = true
                    },

                    onRevokeAccess: async (context) => {
                        console.log("Revoke access:", context.metadata);
                        // 👉 qui ispro = false
                    },
                }
            );

            reply.send({ ok: true });
        } catch (err) {
            console.error("Webhook error:", err);
            reply.status(400).send({ ok: false });
        }
    });
}