export async function registrationFunction(name: string, email: string, password: string) {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in registrationFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Registration failed"
            };
        }

        return data;

    } catch (error) {
        console.log("Unexpected error in cancelAccountFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}   