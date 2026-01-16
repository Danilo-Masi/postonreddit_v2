import meRoute from "./me.mjs";

export default async function userRoute(fastify, opts) {
    fastify.register(meRoute)
}