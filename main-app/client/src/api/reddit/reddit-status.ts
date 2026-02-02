export async function redditStatus() {
    try {
        const response = await fetch("http://127.0.0.1:3000/reddit/status", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || data.valid === false) {
            console.error("Reddit authorization invalid: ", data);
            return { ok: false, valid: false, error: data.message || "Invalid tokens" };
        }

        return { ok: true, valid: true };
    } catch (error) {
        console.error("Network error during Reddit authorization: ", error);
        return { ok: false, valid: false, error: "Network error" };
    }
}