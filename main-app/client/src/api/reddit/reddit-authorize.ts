export async function redditAuthorize() {
    try {
        const response = await fetch(
            "http://127.0.0.1:3000/reddit/authorize",
            {
                method: "GET",
                credentials: "include",
            });

        const data = await response.json();

        if (!response.ok) {
            console.log("Response error in redditAuthorizeFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Authorization session failed"
            };
        }

        return { ok: true, url: data.url };

    } catch (error) {
        console.log("Unexpected error in redditAuthorizeFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}