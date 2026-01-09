import { creem } from "../../config/creem.mjs";
import { supabase } from "../../config/supabase.mjs";

export default async function webhookRoutes(fastify) {
    fastify.post('/webhook', async (req, res) => {
        try {
            await creem.webhooks.handleEvents(
                req.body, // raw body as string
                req.headers['creem-signature'],
                {
                    onCheckoutCompleted: async (data) => {
                        console.log('Checkout completed:', data.customer?.email);
                    },

                    onGrantAccess: async (context) => {
                        // Grant user access when subscription is active/trialing/paid
                        const userId = context.metadata?.userId;
                        const plan = context.metadata?.plan;

                        if (!userId || !plan) {
                            req.log.error("Missing metadata: ", context.metadata);
                            return;
                        }

                        const now = new Date();

                        const updateData =
                            plan === "lifetime"
                                ? {
                                    ispro: true,
                                    pro_since: now,
                                    pro_type: "lifetime",
                                    pro_expiration: null,
                                } : {
                                    ispro: true,
                                    pro_since: now,
                                    pro_type: "subscription",
                                    pro_expiration: new Date(
                                        now.setMonth(now.getMonth() + 1)
                                    ),
                                };

                        const { error } = await supabase
                            .from("profiles")
                            .update(updateData)
                            .eq("id", userId);

                        if (error) {
                            req.log.error("DB update failded: ", error);
                            // TODO: rilanciare webhook fino a stato 200
                        }
                    },

                    onRevokeAccess: async (context) => {
                        // Revoke access when subscription is paused/expired
                        const userId = context.metadata?.userId;
                        await revokeUserAccess(userId);
                    },
                }
            );

            res.status(200).send('OK');
        } catch (error) {
            console.error('Webhook error:', error);
            res.status(400).send('Invalid signature');
        }
    });
}