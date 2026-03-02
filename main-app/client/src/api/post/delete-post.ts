export async function deletePostFunction(post_id: string) {

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
        console.error("Delete post error: " + data.error);
        return { ok: false, error: data.error };
    }

    return { ok: res.ok, error: data.error };
}