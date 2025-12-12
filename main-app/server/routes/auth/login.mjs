import { supabase } from "../../config/supabase.mjs";

export default async function loginRoute(fastify) {

    fastify.post("/login", async (request, reply) => {

        const { email, password } = request.body;

        if (!email || !password) {
            request.log.error("Error handling credentials");
            return reply.status(400).send({
                ok: false,
                error: "Missing email or password",
            });
        }

        try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error || !data.session.access_token) {
                request.log.error("Error handling login supabase function");
                return reply.status(401).send({
                    ok: false,
                    error: "Login fault",
                });
            }

            return reply.status(200).send({
                token: data.session.access_token,
            });

        } catch (error) {
            request.log.error("Error handling server login");
            return reply.status(500).send({
                ok: false,
                error: "Server fault",
            })
        }
    });
}