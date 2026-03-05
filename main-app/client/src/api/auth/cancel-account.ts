export async function cancelAccountFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/cancel-account", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in cancelAccountFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Account cancellation failed"
            }
        }

        return { ok: true };
        
    } catch (error) {
        console.log("Unexpected error in cancelAccountFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        }
    }
}