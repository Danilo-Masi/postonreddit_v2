import { supabaseAdmin } from "../../config/supabase.mjs";
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

            const { data: postData, error: postError } = await supabaseAdmin
                .from("posts_test")
                .insert({
                    user_id: validatedUser.id,
                    title,
                    content,
                })
                .select()
                .single();

            if (postError) {
                request.log.error({ postError }, "Supabase error in /create-post");
                return reply.status(500).send({ ok: false, error: "Supabase error" })
            }

            const targetsToInsert = subredditTargets.map((t) => {
                if (!t.subreddit || !t.scheduledAt) {
                    request.log.error("Invalid subreddit target structure in /create-post");
                    return reply.status(501).send({ ok: false, error: "Invalid subreddit target structure" })
                }

                return {
                    post_id: postData.id,
                    subreddit: t.subreddit,
                    flair: t.flairId ?? null,
                    scheduled_at: t.scheduledAt,
                    status: "pending",
                };
            });

            const { error: targetsError } = await supabaseAdmin
                .from("post_targets")
                .insert(targetsToInsert);

            if (targetsError) {
                request.log.error("Supabase error inserting subreddit targtes in /create-post");
                await supabaseAdmin
                    .from("posts_test")
                    .delete()
                    .eq("id", postData.id);
                return reply.status(500).send({ ok: false, error: "Subase error inserting subreddit targets" });
            }

            return reply.status(200).send({ ok: true });

        } catch (err) {
            request.log.error({ err }, "Server unexepcted error in /create-post");
            return reply.status(500).send({ ok: false, error: "Server unexpected error" });
        }
    });
}