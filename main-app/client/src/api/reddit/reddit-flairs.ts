export async function getFlairs(query: string) {
    try {
        if (!query || query.length < 2) {
            return { ok: true, subreddits: [] }
        }

        const res = await fetch(`http://127.0.0.1:3000/reddit/flairs?q=${encodeURIComponent(query)}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Flairs fetch failed: ", data);
            return { ok: false, error: "Failed to fetch flairs" }
        }

        return { ok: true, flairs: data.flairs }

    } catch (error) {
        console.error("Network error during flairs search: ", error);
        return { ok: false, error: "Network error" };
    }
}