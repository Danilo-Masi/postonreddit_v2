import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";
import { redditRefresh } from "../../services/reddit.service.mjs";

export default async function redditStatusRoute(fastify, opts) {

    fastify.get("/status", async (request, reply) => {
        try {
            // Validate user
            const user_token = request.cookies.access_token;
            const validatedUser = await getAuthenticatedUser(user_token);
            const userId = validatedUser.id;

            // Get the tokens from Supabase
            const { data, error } = await supabaseAdmin
                .from("reddit_tokens")
                .select("access_token, refresh_token, token_expiry")
                .eq("user_id", userId)
                .single();

            if (error) {
                request.log.error("Errore durante il recupero dei token di Reddit: " + error?.message);
                return reply.status(500).send({ ok: false, valid: false });
            }

            // Validate the tokens
            const { access_token, refresh_token, token_expiry } = data;
            const now = new Date();
            
            if (!access_token || !refresh_token || !token_expiry || new Date(token_expiry) <= now) {
                try {
                    const refresh = await redditRefresh(refresh_token, userId);

                    if (!refresh) {
                        return reply.status(500).send({ ok: false, valid: false });
                    }

                    return reply.send({ ok: true, valid: true });

                } catch (error) {
                    request.log.error("Errore durante il refresh del token Reddit: " + error?.message);
                    return reply.status(500).send({ ok: true, valid: false });
                }
            }

            return reply.send({ ok: true, valid: true });

        } catch (error) {
            request.log.error("Errore endpoint /reddit/status: " + error?.message);
            return reply.status(500).send({ ok: false, valid: false });
        }
    });

}