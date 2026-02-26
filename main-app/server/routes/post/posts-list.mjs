import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function postsListRoute(fastify) {
    fastify.get("/posts-list", async (request, reply) => {
        try {
            const user_token = request.cookies.access_token;

            if (!user_token) {
                return reply.status(401).send({ ok: false, error: "Unauthorized" });
            }

            const validatedUser = await getAuthenticatedUser(user_token);
            if (!validatedUser) {
                return reply.status(401).send({ ok: false, error: "Invalid session" });
            }

            const filter = request.query.filter || "today";

            const now = new Date();
            let startDate = new Date();
            let endDate = null;

            switch (filter) {
                case "today":
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date();
                    endDate.setHours(23, 59, 59, 999);
                    break;

                case "week":
                    endDate = new Date();
                    endDate.setDate(now.getDate() + 7);
                    break;

                case "month":
                    endDate = new Date();
                    endDate.setMonth(now.getMonth() + 1);
                    break;

                case "all":
                    startDate = null;
                    break;

                default:
                    return reply.status(400).send({ ok: false, error: "Invalid filter" });
            }

            let query = supabaseAdmin
                .from("posts_test")
                .select(`
                    id,
                    title,
                    content,
                    post_targets (
                        id,
                        subreddit,
                        flair,
                        scheduled_at,
                        status
                    )
                `)
                .eq("user_id", validatedUser.id)
                //.order("created_at", { ascending: false });

            if (startDate) {
                query = query.gte("post_targets.scheduled_at", startDate.toISOString());
            }

            if (endDate) {
                query = query.lte("post_targets.scheduled_at", endDate.toISOString());
            }

            const { data, error } = await query;

            if (error) {
                request.log.error({ error }, "Error fetching posts list");
                return reply.status(500).send({ ok: false });
            }

            console.log("Supabase query result: ", { data }); // DEBUG LOG

            return reply.send({ ok: true, posts: data });

        } catch (err) {
            request.log.error({ err }, "Posts list error");
            return reply.status(500).send({ ok: false });
        }
    });
}