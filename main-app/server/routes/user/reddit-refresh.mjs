export default async function redditRefreshRoute(fastify) {
    fastify.get("/reddit-refresh", async (request, reply) => {
        request.log.info("Handiling reddit refresh...");
        return { route: "reddit-refresh-route" };
    })
}