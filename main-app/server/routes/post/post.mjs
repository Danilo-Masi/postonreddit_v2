import createPostRoute from "./create-post.mjs";
import deletePostRoute from "./delete-post.mjs";
import postsListRoute from "./posts-list.mjs";
import updatePostRoute from "./update-post.mjs";

export default async function postRoutes(fastify, opts) {
    fastify.register(createPostRoute);
    fastify.register(deletePostRoute);
    fastify.register(updatePostRoute);
    fastify.register(postsListRoute);
}