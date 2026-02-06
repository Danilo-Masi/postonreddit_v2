import { supabase, supabaseAdmin } from "../../config/supabase.mjs";

export default async function meRoute(fastify) {
    fastify.get("/me", async (request, reply) => {
        try {
            // Recupera i token di accesso dai cookie
            const access_token = request.cookies.access_token;
            const refresh_token = request.cookies.refresh_token;

            if (!access_token || !refresh_token) {
                request.log.error("Token di accesso non validi");
                return reply.status(401).send({
                    logged: false,
                    paying: false,
                });
            }

            // Prova a validare l'access_token
            const { data, error } = await supabase.auth.getUser(access_token);

            // Se non è valido provo il refresh
            if (error || !data?.user) {
                request.log.info("Token di accesso non valido o scaduto, provo refresh");

                let { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({ refresh_token });

                if (refreshError || !refreshData?.session) {
                    request.log.error("Refresh token non valido: ", refreshError);
                    return reply.status(401).send({
                        logged: false,
                        paying: false,
                    });
                }

                reply
                    .setCookie("access_token", refreshData.session.access_token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    })
                    .setCookie("refresh_token", refreshData.session.refresh_token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 60 * 60 * 24 * 30
                    });

                data = { user: refreshData.user };
            }

            // Recupera informazioni aggiuntive dell'utente dal database
            let { data: profiles, error: profilesError } = await supabaseAdmin
                .from('profiles')
                .select('ispro')
                .eq('id', data.user.id)
                .single();

            if (profilesError || profiles.ispro === null) {
                request.log.error("Impossibile recuperare i dati del profilo utente: ", profilesError);
                return reply.status(500).send({
                    logged: true,
                    paying: false,
                });
            }

            // Risposta con i dati dell'utente
            return reply.send({
                logged: true,
                paying: profiles.ispro,
            });
        } catch (err) {
            request.log.error("Errore interno del server: ", err.message);
            return reply.status(500).send({
                logged: false,
                paying: false,
            });
        }
    });
}