export async function getFlairs(query: string) {
    try {
        // Query troppo corta
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

        // Se la fetch fallisce (es. 500), logga ma restituisci sempre un array vuoto
        if (!res.ok) {
            console.error("Flairs fetch failed: ", data);
            return { ok: false, flairs: [] };
        }

        // Se l'endpoint ritorna flairs undefined o null, restituisci sempre un array
        const flairs = Array.isArray(data.flairs) ? data.flairs : [];
        return { ok: true, flairs };

    } catch (error) {
        console.error("Network error during flairs search: ", error);
        return { ok: false, flairs: [] };
    }
}