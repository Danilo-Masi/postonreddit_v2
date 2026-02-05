import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function redditAuthorizeRoute(fastify, opts) {

    const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
    const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
    const SCOPES = 'identity flair modflair read submit';

    fastify.get("/authorize", async (request, reply) => {
        // Validate user
        const access_token = request.cookies.access_token;
        const validatedUser = await getAuthenticatedUser(access_token);
        const userId = validatedUser.id;
        // Create state parameter to prevent CSRF
        const state = `user_id:${userId}`;
        // Construct Reddit authorization URL
        const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;
        // Return the authorization URL
        return reply.send({
            ok: true,
            url: redditAuthUrl,
        });
    });

}