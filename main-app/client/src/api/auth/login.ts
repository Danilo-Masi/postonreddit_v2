export async function loginFunction(email: string, password: string) {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in loginFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Login failed"
            };
        }

        return {
            ok: true,
            user: data.user,
            hasActivePlan: data.hasActivePlan,
        };

    } catch (error) {
        console.log("Unexpected error in loginFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}