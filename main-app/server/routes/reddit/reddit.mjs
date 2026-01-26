import redditAuthorizeRoute from "./reddit-authorize.mjs";
import redditConnectRoute from "./reddit-connect.mjs";
import redditStatusRoute from "./reddit-status.mjs";

export default async function redditRoute(fastify, opts) {
    fastify.register(redditAuthorizeRoute);
    fastify.register(redditConnectRoute);
    fastify.register(redditStatusRoute);
}