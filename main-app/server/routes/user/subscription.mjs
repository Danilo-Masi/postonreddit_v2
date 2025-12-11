export default async function subscriptionRoute(fastify) {
    fastify.get("/subscription", async (request, reply) => {
        request.log.info("Handiling subscrption...");
        return { route: "subscription-route" };
    })
}