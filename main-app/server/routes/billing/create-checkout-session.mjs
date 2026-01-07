import { creem } from "../../config/creem.mjs";
import { supabase } from "../../config/supabase.mjs";

export default async function checkoutSessionRoute(fastify) {

    fastify.post("/create-checkout-session", async (request, reply) => {
        const access_token = request.cookies.access_token;

        console.log("ACCESS TOKEN: ", access_token); // DEBIG LOG

        if (!access_token) {
            return reply.status(401).send({
                ok: false,
                error: "Not authenticated",
            });
        }

        const { data } = await supabase.auth.getUser(access_token);

        if (!data?.user) {
            return reply.status(401).send({
                ok: false,
                error: "Invalid access token",
            });
        }

        const userId = data.user.id;
        const email = data.user.email;

        const { plan } = request.body;

        if (!plan) {
            request.log.error("Missing plan");
            return reply.status(400).send({
                ok: false,
                error: "Missing plan",
            });
        }

        try {
            let product_id;
            if (plan === "monthly") {
                product_id = process.env.MONTHLY_TEST_PRODUCT_ID;
            } else {
                product_id = process.env.LIFETIME_TEST_PRODUCT_ID;
            }

            const checkout = await creem.checkouts.create({
                productId: product_id,
                customer: { email: email },
                successUrl: "http://www.postonreddit.com", // TO BE UPDATE
                metadata: {
                    userId: userId,
                }
            });

            return reply.send({
                ok: true,
                checkoutUrl: checkout.checkoutUrl,
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