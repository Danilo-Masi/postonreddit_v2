export async function createPostFunction() {

    // DA MODIFICA CON I DATI REALI // TODO

    try {
        const res = await fetch("http://127.0.0.1:3000/post/create-post", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "No one give a fuck until you win",
                content: "Sound crazy but is lieke taht",
                subredditTargets: [
                    {
                        subreddit: "Ritrovamrnti",
                        flairId: "123456",
                        scheduledAt: new Date(Date.now() + 60000).toISOString(),
                    },
                    {
                        subreddit: "Cazzinmma",
                        flairId: "123456222",
                        scheduledAt: new Date(Date.now() + 60000).toISOString(),
                    },
                ]
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in createPostFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Post creation failed"
            };
        }

        return { ok: true };

    } catch (error) {
        console.log("Unexpected error in createPostFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}