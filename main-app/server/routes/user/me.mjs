import { supabase } from "../../config/supabase.mjs";

export default async function meRoute(fastify) {
    fastify.get("/me", async (request, reply) => {
        try {
            // 1. Recupera il token di accesso dai cookie
            const access_token = request.cookies.access_token;

            if (!access_token) {
                request.log.error("Nessun token presente nei cookie");
                return reply.status(401).send({
                    logged: false,
                    paying: false,
                });
            }

            // 2. Verifica il token di accesso con Supabase
            const { data, error } = await supabase.auth.getUser(access_token);

            if (error || !data?.user) {
                request.log.error("Token di accesso non valido o scaduto: ", error);
                return reply.status(401).send({
                    logged: false,
                    paying: false,
                });
            }

            // 3. Recupera informazioni aggiuntive dell'utente dal database
            let { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('ispro')
                .eq('id', data.user.id)
                .single();


            if (profilesError || profiles.ispro === undefined) {
                request.log.error("Impossibile recuperare i dati del profilo utente: ", profilesError);
                return reply.status(500).send({
                    logged: true,
                    paying: false,
                    error: "Unable to retrieve user profile data",
                });
            }

            // 4. Risposta con i dati dell'utente
            return reply.send({
                logged: true,
                paying: profiles.ispro,
            });
        } catch (err) {
            request.log.error("Errore interno del server:", err);
            return reply.status(500).send({
                logged: false,
                paying: false,
                error: "Internal server error",
            });
        }
    });
}