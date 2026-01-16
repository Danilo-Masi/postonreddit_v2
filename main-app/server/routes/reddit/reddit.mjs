import redditAuthorizeRoute from "./reddit-authorize.mjs";

export default async function redditRoute(fastify, opts) {
    fastify.register(redditAuthorizeRoute);
}