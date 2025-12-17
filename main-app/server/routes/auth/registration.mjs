import { supabase } from "../../config/supabase.mjs";

export default async function registrationRoute(fastify) {

    fastify.post("/register", async (request, reply) => {
        const { name, email, password, plan } = request.body;
        if (!name || !email || !password) {
            request.log.error("Missing name, email or password");
            return reply.status(400).send({
                ok: false,
                error: "Missing name, email or password",
            });
        }

        try {
            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: { name: name }
                }
            });

            if (error || !data?.session) {
                request.log.error("Supabase registration failed", error);
                return reply.status(401).send({
                    ok: false,
                    error: "Invalid credentials",
                });
            }

            let product_id;
            if (plan === "monthly") {
                product_id = process.env.MONTLY_TEST_PRODUCT_ID;
            } else if (plan === "lifetime") {
                product_id = process.env.LIFETIME_TEST_PRODUCT_ID;
            } else {
                product_id = null;
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
                .send({
                    ok: true,
                    user: {
                        id: data.user.id,
                        name: data.user.user_metadata.name,
                        email: data.user.email,
                    },
                    product_id: product_id,
                });

        } catch (err) {
            request.log.error({ err }, "Internal server error");
            return reply.status(500).send({
                ok: false,
                error: "Server error",
            });
        }
    });

}