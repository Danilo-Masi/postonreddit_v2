export async function getFlairs(query: string) {
    try {
        if (!query || query.length < 2) {
            return { ok: true, flairs: [] };
        }

        const res = await fetch(
            `http://127.0.0.1:3000/reddit/flairs?q=${encodeURIComponent(query)}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in getFlairFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                flairs: [],
                error: "Flairs request failed"
            };
        }

        const flairs = Array.isArray(data.flairs) ? data.flairs : [];
        return { ok: true, flairs };

    } catch (error) {
        console.log("Unexpected error in getFlairFunction():  ", error); // DEBUG LOG
        return {
            ok: false,
            flairs: [],
            error: "Unexptected error"
        };
    }
}