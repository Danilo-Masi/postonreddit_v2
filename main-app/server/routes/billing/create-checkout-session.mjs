import { createCreem } from "creem_io";

export default async function checkoutSessionRoute(fastify) {

    fastify.post("/create-checkout-session", async (request, reply) => {
        const { userId, email, plan } = request.body;
        if (!userId || !email || !plan) {
            request.log.error("Missing userId, email, or plan");
            return reply.status(400).send({
                ok: false,
                error: "Missing userId, email, or plan",
            });
        }

        try {
            let product_id;
            if (plan === "monthly") {
                product_id = process.env.MONTHLY_TEST_PRODUCT_ID;
            } else {
                product_id = process.env.LIFETIME_TEST_PRODUCT_ID;
            }

            console.log("ENV KEY:", process.env.CREEM_TEST_API_KEY); // Debug Log
            console.log("PRODUCT ID:", product_id); // Debug Log

            const creem = createCreem({
                apiKey: process.env.CREEM_TEST_API_KEY,
                // webhook to be set up later
                testMode: true, // Set to false for production
            });

            const checkout = await creem.checkouts.create({
                productId: product_id,
                customer: { email: email },
                successUrl: "http://www.postonreddit.com", // To be updated
                // metadata to be setup later
            });

            console.log("LINK REDIRECT: ", checkout.checkoutUrl); // Debug log

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