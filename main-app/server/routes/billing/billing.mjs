import checkoutSessionRoute from "./create-checkout-session.mjs";

export default async function billingRoutes(fastify, opts) {
    fastify.register(checkoutSessionRoute);
}