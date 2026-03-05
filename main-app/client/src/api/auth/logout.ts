export async function logoutFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in logoutFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Logout failed"
            };
        }

        return { ok: true };

    } catch (error) {
        console.log("Unexpected error in logoutFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}