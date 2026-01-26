export async function redditStatus() {
    try {
        const response = await fetch("http://127.0.0.1:3000/reddit/status", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        console.log("API DATA: ", data);

        if (!response.ok) {
            console.error("Reddit authorization error: ", data.error);
            return { ok: false, error: data.error };
        }

        return { ok: true };
    } catch (error) {
        console.error("Network error during Reddit authorization: ", error);
        return { ok: false, error: "Network error" };
    }
}