import { supabase, supabaseAdmin } from "../../config/supabase.mjs";
import { creem } from "../../config/creem.mjs";

export default async function cancelRoute(fastify) {

    fastify.post("/cancel-account", async (request, reply) => {
        try {
            const access_token = request.cookies.access_token;

            if (!access_token) {
                request.log.error("No access token provided");
                return reply.status(401).send({
                    ok: false,
                    error: "Not authenticated"
                });
            }

            const { data } = await supabase.auth.getUser(access_token);

            if (!data?.user) {
                request.log.error("Invalid access_token provided");
                return reply.status(401).send({
                    ok: false,
                    error: "Invalid access token",
                });
            }

            const userId = data.user.id;

            // 1-Recupera info abbonamento dal DB
            let { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('pro_subscription_id')
                .eq('id', userId)
                .single();

            if (profilesError) {
                request.log.error({ profilesError }, "Error fetching user profile");
                return reply.status(500).send({
                    ok: false,
                    error: "Error fetching user profile",
                });
            }

            const subscriptionId = profiles?.pro_subscription_id;

            // 2-Se c'è un abbonamento attivo, lo cancella
            if (subscriptionId !== null) {
                const { error } = await creem.subscriptions.cancel({
                    subscriptionId: subscriptionId,
                });

                if (error) {
                    request.log.error({ error }, "Error cancelling subscription");
                    return reply.status(500).send({
                        ok: false,
                        error: "Error cancelling subscription",
                    });
                }
            }

            // 3-Cancella l'utente
            const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

            if (error) {
                request.log.error({ error }, "Error deleting user from database");
                return reply.status(500).send({
                    ok: false,
                    error: "Error deleting user",
                });
            }

            reply
                .clearCookie("access_token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .send({ ok: true });

        } catch (error) {
            request.log.error({ error }, "Internal server error");
            return reply.status(500).send({
                ok: false,
                error: "Account cancellation failed",
            });
        }
    });

}