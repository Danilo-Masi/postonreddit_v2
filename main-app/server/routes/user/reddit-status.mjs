export default async function redditStatusRoute(fastify) {
    fastify.get("/reddit-status", async (request, reply) => {
        request.log.info("Handiling reddit status...");
        return { route: "reddit-status-route" };
    })
}