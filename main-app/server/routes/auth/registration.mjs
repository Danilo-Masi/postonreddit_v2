export default async function registrationRoute(fastify) {
    fastify.get("/registration", async (request, reply) => {
        request.log.info("Handling registration...");
        return { route: "registration-route" };
    });
}