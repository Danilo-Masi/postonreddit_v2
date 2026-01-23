import { getAuthenticatedUser } from "../../services/auth.service.mjs";
import { supabase } from "../../config/supabase.mjs";
import { creem } from "../../config/creem.mjs";

export default async function cancelSubscriptionRoute(fastify) {

    fastify.post("/cancel-subscription", async (request, reply) => {
        try {
            // Validate user
            const access_token = request.cookies.access_token;
            const validatedUser = await getAuthenticatedUser(access_token);

            // Get user ID
            const userId = validatedUser.id;

            // Get subscription ID from user's profile
            let { data, error: profilesError } = await supabase
                .from('profiles')
                .select('pro_subscription_id')
                .eq('id', userId)
                .single();

            // TODO: Risolvere problema fetch profile
            // TODO: Risolvere problema fetch profile
            console.log("Fetched profile data: ", data); // DEBUG LOG

            if (profilesError || !data) {
                request.log.error("Error fetching user profile: " + profilesError.message);
                return reply.status(500).send({ ok: false, error: "Error fetching user profile" });
            }

            const subscriptionId = data.pro_subscription_id;

            // Cancel subscription if exists
            if (subscriptionId !== null) {
                const { error } = await creem.subscriptions.cancel({
                    subscriptionId: subscriptionId,
                });

                if (error) {
                    request.log.error("Error cancelling subscription: " + error.message);
                    return reply.status(500).send({ ok: false, error: "Error cancelling subscription" });
                }
            } else {
                return reply.status(200).send({ ok: true, message: "No active subscription to cancel" });
            }

            reply.send({ ok: true });

        } catch (error) {
            request.log.error("Internal server error: ", { error });
            return reply.status(500).send({ ok: false, error: "Subscription cancellation failed" });
        }
    });

}