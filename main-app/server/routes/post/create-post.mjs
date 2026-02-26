import { supabase } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function createPostRoute(fastify) {

    fastify.post("/create-post", async (request, reply) => {
        try {
            const { title, content, subredditTargets } = request.body;

            if (!title || !content || !Array.isArray(subredditTargets) || subredditTargets.length === 0) {
                return reply.status(400).send({ ok: false, error: "Missing required fields" });
            }

            const user_token = request.cookies.access_token;
            if (!user_token) {
                return reply.status(401).send({ ok: false, error: "Unauthorized" });
            }

            const validatedUser = await getAuthenticatedUser(user_token);
            if (!validatedUser) {
                return reply.status(401).send({ ok: false, error: "Invalid session" });
            }

            const { data: postData, error: postError } = await supabase
                .from("posts_test")
                .insert({
                    user_id: validatedUser.id,
                    title,
                    content,
                })
                .select()
                .single();

            if (postError) throw postError;

            const postId = postData.id;

            const targetsToInsert = subredditTargets.map((t) => {
                if (!t.subreddit || !t.scheduledAt) {
                    throw new Error("Invalid subreddit target structure");
                }

                return {
                    post_id: postId,
                    subreddit: t.subreddit,
                    flair: t.flairId ?? null,
                    scheduled_at: t.scheduledAt,
                    status: "pending",
                };
            });

            const { error: targetsError } = await supabase
                .from("post_targets")
                .insert(targetsToInsert);

            if (targetsError) {
                // rollback manuale
                await supabase.from("posts_test").delete().eq("id", postId);
                throw targetsError;
            }

            return reply.status(201).send({ ok: true });

        } catch (err) {
            request.log.error({ err }, "Create post error");
            return reply.status(500).send({ ok: false });
        }
    });
}