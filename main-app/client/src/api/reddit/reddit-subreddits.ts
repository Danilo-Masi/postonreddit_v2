export async function getSubreddits(query: string) {
    try {
        if (!query || query.length < 2) {
            return { ok: true, subreddits: [] }
        }

        const res = await fetch(`http://127.0.0.1:3000/reddit/subreddits?q=${encodeURIComponent(query)}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in getSubredditFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Failed to fetch subreddits"
            }
        }

        return { ok: true, subreddits: data.subreddits }

    } catch (error) {
        console.log("Unexpected error in getSubredditFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}