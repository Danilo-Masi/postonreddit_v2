import { supabase } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";
import { redditRefresh } from "../../services/reddit.service.mjs";

export default async function redditStatusRoute(fastify, opts) {

    fastify.get("/status", async (request, reply) => {
        try {
            // Validate query
            const { q } = request.query;
            if (!q || q.length < 2) {
                return reply.status(400).send({ ok: false, error: "Query must be at least 2 character" });
            }

            // Validate user
            const user_token = request.cookies.access_token;
            const validatedUser = await getAuthenticatedUser(user_token);
            const userId = validatedUser.id;

            // Get Reddit tokens
            const { data, error } = await supabase
                .from("reddit_tokens")
                .select("access_token, refresh_token, token_expiry")
                .eq("user_id", userId)
                .single();

            if (error || !data) {
                request.log.error("Reddit tokens not found: " + error);
                return reply.status(500).send({ ok: false });
            }

            let { access_token, refresh_token, token_expiry } = data;

            // Refresh token if expiring
            if (new Date(token_expiry) <= new Date(Date.now() + 5 * 60 * 1000)) {
                request.log.info("Reddit access_token expiring, refreshing...");
                access_token = await redditRefresh(refresh_token, userId);
            }

            // Call Reddit API
            const redditRes = await fetch(
                `https://oauth.reddit.com/subreddits/search?q=${encodeURIComponent(q)}&limit=10`,
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "User-Agent": "postonreddit/2.0.0 by WerewolfCapital4616",
                    },
                });

            if (!redditRes.ok) {
                request.log.error("Reddit API error: ", redditRes.status);
                return reply.status(500).send({ ok: false });
            }

            const json = await redditRes.json();

            const subreddits = json.data.children.map((child) => ({
                name: child.data.dispaly_name,
                title: child.data.title,
            }));

            return reply.send({ ok: true, subreddits });

        } catch (error) {
            request.log.error("Error /reddit/subreddits: ", error);
            return reply.status(500).send({ ok: false});
        }
    });

}