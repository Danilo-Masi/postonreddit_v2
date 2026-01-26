import { supabase } from "../../config/supabase.mjs";

export default async function redditConnectRoute(fastify, opts) {

    const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
    const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REDDIT_SECRET_KEY;

    fastify.get("/connect", async (request, reply) => {
        const { code, state, error } = request.query;

        if (error) {
            request.log.error("Errore dati redirect da Reddit: " + error?.message);
            return reply.status(500).send({
                ok: false,
                message: "Autorizzazione Reddit negata",
            });
        }

        try {
            const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + Buffer
                        .from(`${CLIENT_ID}:${CLIENT_SECRET}`)
                        .toString("base64"),
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "postonreddit/2.0.0 by WerewolfCapital4616",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const tokenData = await tokenRes.json();
            const { access_token, refresh_token, expires_in } = tokenData;
            const token_expiry = new Date(Date.now() + expires_in * 1000);
            const user_id = state.split(":")[1];

            const { error } = await supabase
                .from('reddit_tokens')
                .upsert({
                    user_id: user_id,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    token_expiry: token_expiry,
                });

            if (error) {
                request.log.error("Errore durante il salvataggio di access_token in reddit_tokens: " + error?.message);
                return reply.status(500).send({
                    ok: false,
                    message: "Errore durante il salvataggio nel DB",
                });
            }

            return reply.redirect("http://localhost:3000"); // TODO: UPDATE

        } catch (error) {
            request.log.error("Errore interno OAuth Reddit: " + error?.message);
            return reply.status(500).send({
                ok: false,
                message: "Errore interno server",
            });
        }

    });

}