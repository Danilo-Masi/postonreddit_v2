import { supabase } from "../../config/supabase.mjs";

export default async function redditAuthorizeRoute(fastify, opts) {

    const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
    const REDDIT_REDIRECT_URI = "http://localhost:3000/reddit/callback" || process.env.REDDIT_REDIRECT_URI;
    const SCOPES = ["identity", "read", "submit", "mysubreddits", "history"].join(" ");

    fastify.get("/authorize", async (request, reply) => {

        const access_token = request.cookies.access_token;
        if (!access_token) {
            return reply.status(401).send({
                ok: false,
                error: "Not authenticated",
            });
        }
        const { data } = await supabase.auth.getUser(access_token);
        if (!data?.user) {
            return reply.status(401).send({
                ok: false,
                error: "Invalid access token",
            });
        }
        const userId = data.user.id;

        const state = `user_id:${userId}`;

        const redditAuthUrl = `https://www.reddit.com/api/v1/auhthorize?` +
            `client_id=${REDDIT_CLIENT_ID}` +
            `&response_type=code` +
            `&state=${encodeURIComponent(state)}` +
            `&redirect_uri=${encodeURIComponent(REDDIT_REDIRECT_URI)}` +
            `&duration=permanent` +
            `&scope=${encodeURIComponent(SCOPES)}`;

        return reply.send({
            ok: true,
            url: redditAuthUrl,
        });
    });

}