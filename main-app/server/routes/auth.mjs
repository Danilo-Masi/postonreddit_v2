export default async function authRoutes(fastify, opts) {

    fastify.get("/login", async (request, reply) => {
        request.log.info("Handling login route");
        return { route: "login-route" };
    });

    fastify.get("/registration", async (request, reply) => {
        request.log.info("Handling registration route");
        return { route: "registration-route" };
    });

    fastify.get("/logout", async (request, reply) => {
        request.log.info("Handling logout route");
        return { route: "logout-route" };
    });

}