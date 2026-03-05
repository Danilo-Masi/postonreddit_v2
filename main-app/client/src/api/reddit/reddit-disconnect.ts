export async function redditDisconnectFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/reddit/disconnect", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in redditDisconnectFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Reddit disconnession failed"
            };
        }

        return data;

    } catch (error) {
        console.log("Unexpected error in redditDisconnectFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}