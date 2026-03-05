export async function postsListFunction(filter: string = "today") {
    try {
        const res = await fetch(`http://127.0.0.1:3000/post/posts-list?filter=${filter}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in postsListFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                posts: [],
                error: "Failed to fetch posts",
            };
        }

        return {
            ok: true,
            posts: data.posts || [],
        };

    } catch (error) {
        console.log("Unexpected error in createPostFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            posts: [],
            error: "Unexptected error"
        };
    }
}