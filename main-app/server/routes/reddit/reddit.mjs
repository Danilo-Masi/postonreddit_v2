import redditAuthorizeRoute from "./reddit-authorize.mjs";
import redditConnectRoute from "./reddit-connect.mjs";
import redditDisconnectRoute from "./reddit-disconnect.mjs";
import redditFlairsRoute from "./reddit-flairs.mjs";
import redditStatusRoute from "./reddit-status.mjs";
import redditSubredditsRoute from "./reddit-subreddits.mjs";

export default async function redditRoute(fastify, opts) {
    fastify.register(redditAuthorizeRoute);
    fastify.register(redditConnectRoute);
    fastify.register(redditDisconnectRoute);
    fastify.register(redditStatusRoute);
    fastify.register(redditSubredditsRoute);
    fastify.register(redditFlairsRoute);
}