export async function createPostFunction() {
    const res = await fetch("http://127.0.0.1:3000/post/create-post", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Test post 2 from client",
            content: "This is a test post 2 created from the client",
            subredditTargets: [
                {
                    subreddit: "testsubreddit",
                    flairId: "123456",
                    scheduledAt: new Date(Date.now() + 60000).toISOString(),
                },
                {
                    subreddit: "testsubreddit2",
                    flairId: "123456222",
                    scheduledAt: new Date(Date.now() + 60000).toISOString(),
                },
            ]
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Create post error:", data.error);
    }

    return { ok: res.ok, error: data.error };
}