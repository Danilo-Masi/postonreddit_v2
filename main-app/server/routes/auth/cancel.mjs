import { supabase } from "../../config/supabase.mjs";

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

            // TODO: Delete payment on creem

            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', userId);

            if (error) {
                request.log.error("Error deleting profile: ", error);
                return reply.status(500).send({
                    ok: false,
                    error: "Error during the deletion of the profile",
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