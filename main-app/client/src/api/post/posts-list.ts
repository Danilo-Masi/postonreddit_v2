export async function postsListFunction(filter = "today") {
    try {
        const res = await fetch(
            `http://127.0.0.1:3000/post/posts-list?filter=${filter}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (res.status === 401) {
            return {
                ok: false,
                posts: [],
                error: "Unauthorized",
            };
        }

        if (!res.ok) {
            console.error("Error in postsListFunction:", res.status);
            return {
                ok: false,
                posts: [],
                error: "Failed to fetch posts",
            };
        }

        const data = await res.json();

        return {
            ok: true,
            posts: data.posts ?? [],
        };

    } catch (err) {
        console.error("postsListFunction network error:", err);
        return {
            ok: false,
            posts: [],
            error: "Network error",
        };
    }
}