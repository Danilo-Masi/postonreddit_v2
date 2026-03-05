export async function deletePostFunction(post_id: string) {
    try {
        const res = await fetch("http://127.0.0.1:3000/post/delete-post", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in deletePostFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Post cancellation failed"
            };
        }

        return { ok: true };
        
    } catch (error) {
        console.log("Unexpected error in deletePostFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}