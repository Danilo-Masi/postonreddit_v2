import meRoute from "./me.mjs";
import redditRefreshRoute from "./reddit-refresh.mjs";
import redditStatusRoute from "./reddit-status.mjs";
import subscriptionRoute from "./subscription.mjs";

export default async function userRoute(fastify, opts) {
    fastify.register(meRoute)
    fastify.register(subscriptionRoute);
    fastify.register(redditStatusRoute);
    fastify.register(redditRefreshRoute);
}