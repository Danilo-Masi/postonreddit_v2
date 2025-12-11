export default async function loginRoute(fastify) {
    fastify.get("/login", async (request, reply) => {
        request.log.info("Handiling login...");
        return { route: "login-route" };
    })
}