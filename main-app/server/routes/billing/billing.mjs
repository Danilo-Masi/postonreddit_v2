import checkoutSessionRoute from "./create-checkout-session.mjs";
import webhookRoutes from "./webhook.mjs";

export default async function billingRoutes(fastify, opts) {
    fastify.register(checkoutSessionRoute);
    fastify.register(webhookRoutes);
}