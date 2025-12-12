import { supabase } from "../../config/supabase.mjs";

export default async function loginRoute(fastify) {
    fastify.post("/login", async (request, reply) => {
        const { email, password } = request.body;
        if (!email || !password) {
            request.log.error("Missing email or password");
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

            if (error || !data?.session) {
                request.log.error("Supabase login failed", error);
                return reply.status(401).send({
                    ok: false,
                    error: "Invalid credentials",
                });
            }

            const { access_token, refresh_token } = data.session;

            reply
                .setCookie("access_token", access_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                })
                .setCookie("refresh_token", refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 30
                })
                .send({ ok: true });
        } catch (err) {
            request.log.error({ err }, "Internal server error");
            return reply.status(500).send({
                ok: false,
                error: "Server error",
            });
        }
    });
}