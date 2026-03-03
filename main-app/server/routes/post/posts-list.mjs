import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function postsListRoute(fastify) {

    fastify.get("/posts-list", async (request, reply) => {
        try {
            // Retrieve the user's access token from cookies
            const user_token = request.cookies.access_token;
            if (!user_token) {
                return reply.status(401).send({ ok: false, error: "Unauthorized" });
            }

            // Validate the token and retrieve the authenticated user
            const validatedUser = await getAuthenticatedUser(user_token);
            if (!validatedUser) {
                return reply.status(401).send({ ok: false, error: "Invalid session" });
            }

            // Read filter from query string (?filter=today|week|month|all)
            // Default value is "today" if no filter is provided
            const filter = request.query.filter || "today";

            const now = new Date();
            let startDate = null;
            let endDate = null;

            // Compute date range based on selected filter
            // We define a startDate and endDate to filter scheduled posts
            switch (filter) {
                case "today":
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0);

                    endDate = new Date();
                    endDate.setHours(23, 59, 59, 999);
                    break;

                case "week":
                    startDate = new Date();

                    endDate = new Date();
                    endDate.setDate(now.getDate() + 7);
                    break;

                case "month":
                    startDate = new Date();

                    endDate = new Date();
                    endDate.setMonth(now.getMonth() + 1);
                    break;

                case "all":
                    break;

                default:
                    return reply.status(400).send({ ok: false });
            }

            // We query post_targets because scheduled_at lives there
            // We also join related post data from posts_test table
            let query = supabaseAdmin
                .from("post_targets")
                .select(`
                    id,
                    subreddit,
                    scheduled_at,
                    status,
                    posts_test (
                        id,
                        title,
                        content,
                        user_id
                    )
                `)
                .eq("posts_test.user_id", validatedUser.id);

            // Apply date filters if defined
            // Filter by scheduled_at >= startDate
            if (startDate) {
                query = query.gte("scheduled_at", startDate.toISOString());
            }

            // Filter by scheduled_at <= endDate
            if (endDate) {
                query = query.lte("scheduled_at", endDate.toISOString());
            }

            // Execute query
            const { data, error } = await query;

            // Handle database errors
            if (error) {
                request.log.error({ error }, "Supabase query error in /posts-list");
                return reply.status(500).send({ ok: false });
            }

            // Supabase returns one row per post_target
            // That means if a post has 3 targets → we get 3 rows
            // We group them manually to return ONE post with multiple targets
            const grouped = {};

            for (const row of data) {
                // Extract related post info
                const post = row.posts_test;
                // Safety check (should not happen, but defensive coding)
                if (!post) continue;
                // If this post is not already in grouped object than create it
                if (!grouped[post.id]) {
                    grouped[post.id] = {
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        targets: []
                    };
                }
                // Push the current target into the post's targets array
                grouped[post.id].targets.push({
                    id: row.id,
                    subreddit: row.subreddit,
                    scheduled_at: row.scheduled_at,
                    status: row.status
                });
            }

            // Return structured response
            // Convert grouped object into array
            return reply.send({
                ok: true,
                posts: Object.values(grouped)
            });

        } catch (err) {
            request.log.error({ err }, "Server unexpected error in /posts-list");
            return reply.status(500).send({ ok: false });
        }
    });
}