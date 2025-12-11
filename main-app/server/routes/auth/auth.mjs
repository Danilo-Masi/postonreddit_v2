import loginRoute from "./login.mjs";
import logoutRoute from "./logout.mjs";
import registrationRoute from "./registration.mjs";

export default async function authRoutes(fastify, opts) {
    fastify.register(loginRoute);
    fastify.register(registrationRoute);
    fastify.register(logoutRoute);
}