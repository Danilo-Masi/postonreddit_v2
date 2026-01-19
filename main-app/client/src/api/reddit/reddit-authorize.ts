export async function redditAuthorize() {
    console.log("2-Reddit auth");
    try {
        const response = await fetch(
            "http://127.0.0.1:3000/reddit/authorize",
            {
                method: "GET",
                credentials: "include",
            });

        const data = await response.json();

        if (!response.ok) {
            console.error("Reddit authorization error: ", data.error);
            return { ok: false, error: data.error };
        }

        return { ok: true, url: data.url };
    } catch (error) {
        console.error("Network error during Reddit authorization: ", error);
        return { ok: false, error: "Network error" };
    }
}