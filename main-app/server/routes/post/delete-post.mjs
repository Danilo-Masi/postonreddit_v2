import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function deletePostRoute(fastify) {

    fastify.post("/delete-post", async (request, reply) => {
        try {
            const { post_id } = request.body;
            if (!post_id) {
                return reply.status(400).send({ ok: false, error: "Missing post id" });
            }

            const user_token = request.cookies.access_token;
            if (!user_token) {
                return reply.status(401).send({ ok: false, error: "Unauthorized" });
            }

            const validatedUser = await getAuthenticatedUser(user_token);
            if (!validatedUser) {
                return reply.status(401).send({ ok: false, error: "Invalid session" });
            }

            const { error } = await supabaseAdmin
                .from('posts_test')
                .delete()
                .eq('id', post_id)
                .eq('user_id', validatedUser.id);

            if (error) {
                request.log.error({ error }, "Supabase error in /delete-post")
                return reply.status(500).send({ ok: false, error: "Supabase error" });
            }

            return reply.status(200).send({ ok: true });
        } catch (error) {
            request.log.error({ error }, "Server unexepcted error in /delete-post");
            return reply.status(500).send({ ok: false, error: "Server unexpected error" })
        }
    });

}