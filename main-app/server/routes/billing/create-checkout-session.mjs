import { createCreem } from "creem_io";

export default async function checkoutSessionRoute(fastify) {

    fastify.post("/create-checkout-session", async (request, reply) => {
        const { email, product_id } = request.body;
        if (!email || !product_id) {
            request.log.error("Missing email or product_id");
            return reply.status(400).send({
                ok: false,
                error: "Missing email or product_id",
            });
        }

        try {
            console.log("ENV KEY:", process.env.CREEM_TEST_API_KEY);
            console.log("Product ID:", product_id);

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

            console.error(checkout.checkoutUrl); // Debug log

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