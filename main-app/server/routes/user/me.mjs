import { supabase } from "../../config/supabase.mjs";

export default async function meRoute(fastify) {

    fastify.get("/me", async (request, reply) => {
        const access_token = request.cookies.access_token;
        if (!access_token) {
            return reply.status(401).send({
                logged: false,
                error: "Not authenticated",
            });
        }

        const { data, error } = await supabase.auth.getUser(access_token);

        if (error || !data?.user) {
            return reply.status(401).send({
                logged: false,
                error: "Authentication failed",
            });
        }

        return reply.send({
            logged: true,
            user: {
                id: data.user.id,
                email: data.user.email,
            },
        });
    });
}