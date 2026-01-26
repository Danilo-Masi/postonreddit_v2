import { supabase } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function redditStatusRoute(fastify, opts) {

    fastify.get("/status", async (request, reply) => {
        // Validate user
        const access_token = request.cookies.access_token;
        const validatedUser = await getAuthenticatedUser(access_token);

        // Get user ID
        const userId = validatedUser.id;

        const { data, error } = await supabase
            .from("reddit_tokens")
            .select("access_token, refresh_token, token_expiry")
            .eq("user_id", userId)
            .select();

        if (error) {
            request.log.error("Errore durante il recupero dei token di reddit: " + error?.message);
            return reply.status(500).send({
                ok: false,
                message: "Errore nel recupero dei token di Reddit",
            });
        }

        console.log(data);

        return data;
    });

}