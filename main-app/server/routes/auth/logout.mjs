export default async function logoutRoute(fastify) {
    fastify.get("/logout", async (request, reply) => {
        request.log.info("Handling logout...");
        return { route: "logout-route" };
    });
}