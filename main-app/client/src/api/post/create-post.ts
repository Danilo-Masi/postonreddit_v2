export async function createPostFunction() {
    const res = await fetch("http://127.0.0.1:3000/post/create-post", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            title: "Test post",
            content: "This is a test post",
            subreddit: "testsubreddit",
            flair: "testflair",
            scheduledAt: new Date().toISOString(),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return { ok: res.ok, error: data.error };
}