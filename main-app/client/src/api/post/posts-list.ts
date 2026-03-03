export async function postsListFunction(filter: string = "today") {
    try {
        // We pass the filter as query parameter (?filter=today|week|month|all)
        const res = await fetch(`http://127.0.0.1:3000/post/posts-list?filter=${filter}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        // Parse JSON response body
        // Even if response is an error (e.g. 400 or 500),
        // backend may still return a JSON body
        const data = await res.json();

        // Handle HTTP-level errors
        // res.ok is false if status is not in 200–299 range
        if (!res.ok) {
            console.error("Failed to fetch posts in postsListFunction: ", data.error);
            return {
                ok: false,
                posts: [],
                error: "Failed to fetch posts",
            };
        }

        // Successful response
        // We return posts from backend
        // Defensive fallback: ensure posts is always an array
        return {
            ok: true,
            posts: data.posts || [],
        };

    } catch (err) {
        console.error("Network error in postsListFunction:", err);
        return {
            ok: false,
            posts: [],
            error: "Network error",
        };
    }
}