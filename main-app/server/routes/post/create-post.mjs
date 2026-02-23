import { supabase } from "../../config/supabase.mjs";
import { getAuthenticatedUser } from "../../services/auth.service.mjs";

export default async function createPostRoute(fastify) {

    fastify.post("/create-post", async (request, reply) => {
        // Validate query
        const { title, content, subreddit, flair, scheduledAt } = request.body;
        console.log("Received payload:", { title, content, subreddit, flair, scheduledAt }); // DEBUG LOG
        if (!title || !content || !subreddit || !flair || !scheduledAt) {
            return reply.status(400).send({ ok: false, error: "Missing required fields" });
        }

        // Validate user
        const user_token = request.cookies.access_token;
        const validatedUser = await getAuthenticatedUser(user_token);
        const userId = validatedUser.id;

        // Create post
        const { data, error } = await supabase
            .from('posts_test')
            .insert([
                { title: title },
                { content: content },
            ])
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            console.error("Error creating post:", error);
            return reply.status(500).send({ ok: false, error: "Error creating post" });
        }

        console.log("Post created successfully:", data); // DEBUG LOG

        return reply.status(200).send({ ok: true, post: data });
    });

}