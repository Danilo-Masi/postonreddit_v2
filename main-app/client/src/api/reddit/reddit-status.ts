export async function redditStatus() {
    try {
        const response = await fetch("http://127.0.0.1:3000/reddit/status", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || data.valid === false) {
            console.log("Response error in redditStatusFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                valid: false,
                error: "Invalid Reddit status"
            };
        }

        return { ok: true, valid: true };

    } catch (error) {
        console.log("Unexpected error in redditStatusFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            valid: false,
            error: "Unexptected error"
        };
    }
}