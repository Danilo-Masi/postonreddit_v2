import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";
import { redditRefresh } from "../../services/reddit.service.mjs";

export default async function redditFlairsRoute(fastify, opts) {

    fastify.get("/flairs", async (request, reply) => {
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
            const { data, error } = await supabaseAdmin
                .from("reddit_tokens")
                .select("access_token, refresh_token, token_expiry")
                .eq("user_id", userId)
                .single();

            if (error || !data) {
                request.log.error("Reddit tokens not found: " + error.message);
                return reply.status(500).send({ ok: false });
            }

            let { access_token, refresh_token, token_expiry } = data;

            // Refresh token if expiring
            if (new Date(token_expiry) <= new Date(Date.now() + 5 * 60 * 1000)) {
                request.log.info("Reddit access_token expiring, refreshing...");
                access_token = await redditRefresh(refresh_token, userId);
            }

            // Call Reddit API
            let redditRes;
            try {
                redditRes = await fetch(
                    `https://oauth.reddit.com/r/${encodeURIComponent(q)}/api/link_flair_v2`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "User-Agent": "postonreddit/2.0.0 by WerewolfCapital4616",
                        },
                    }
                );
            } catch (fetchError) {
                request.log.error("Fetch error: " + fetchError.message);
                return reply.status(500).send({ ok: false, flairs: [] });
            }

            if (!redditRes.ok) {
                // 403 and 404 are common for private or non-existent subreddits
                if (redditRes.status === 403 || redditRes.status === 404) {
                    request.log.warn(`Reddit subreddit ${q} flairs not accesible (status: ${redditRes.status})`);
                    return reply.status(200).send({ ok: true, flairs: [] });
                }
                // Log other errors in detail
                const text = await redditRes.text();
                request.log.error({
                    status: redditRes.status,
                    statusText: redditRes.statusText,
                    headers: Object.fromEntries(redditRes.headers.entries()),
                    body: text,
                });
                return reply.status(500).send({ ok: false });
            }

            // Parsing JSON
            let dataRes = [];
            try {
                dataRes = await redditRes.json();
            } catch (jsonError) {
                request.log.error("Reddit JSON parse error: " + jsonError.message);
                return reply.send({ ok: true, flairs: [] });
            }

            const flairs = Array.isArray(dataRes)
                ? dataRes.map((child) => ({
                    id: child.id,
                    name: child.text,
                }))
                : [];

            return reply.send({ ok: true, flairs });

        } catch (error) {
            request.log.error("Error /reddit/flairs: " + error.message);
            return reply.status(500).send({ ok: false });
        }
    });

}