export async function createPostFunction() {

    // DA MODIFICA CON I DATI REALI // TODO

    const res = await fetch("http://127.0.0.1:3000/post/create-post", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Morbi in posuere augue, quis gravida augue. Proin vestibulum mi in magna ultrices, a ultricies turpis malesuada. Donec euismod consectetur.",
            content: "Morbi auctor, nulla vitae pretium tincidunt, neque ipsum sodales justo, id lobortis ante massa et sapien. Mauris egestas vehicula risus, vel venenatis ex dictum ut. Curabitur at faucibus lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin at urna dui. Duis interdum sapien at faucibus tincidunt. Duis sit amet cursus ipsum, eget lobortis neque. Proin mattis hendrerit nunc, et ornare magna auctor et. Suspendisse eget euismod libero, euismod aliquet ipsum.",
            subredditTargets: [
                {
                    subreddit: "loremipsum",
                    flairId: "123456",
                    scheduledAt: new Date(Date.now() + 60000).toISOString(),
                },
                {
                    subreddit: "loremipsum2",
                    flairId: "123456222",
                    scheduledAt: new Date(Date.now() + 60000).toISOString(),
                },
            ]
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Create post error: " + data.error);
        return { ok: false, error: data.error };
    }

    return { ok: res.ok, error: data.error };
}