import { supabaseAdmin } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function redditDisconnectRoute(fastify, opts) {

    fastify.post("/disconnect", async (request, reply) => {
        const access_token = request.cookies.access_token;
        const validatedUser = await getAuthenticatedUser(access_token);
        const userId = validatedUser.id;

        try {
            const { error } = await supabaseAdmin
                .from('reddit_tokens')
                .delete()
                .eq('user_id', userId);

            if (error) {
                request.log.error(error);
                return reply.status(500).send({ ok: false, error: "DB_DELETE_FAILED" });
            }

            return reply.send({ ok: true });

        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({ ok: false, error: "SERVER_ERROR" });
        }
    });

}