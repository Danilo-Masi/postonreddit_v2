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
            return { ok: false, error: data.error };
        }

        return { ok: true };

    } catch (error) {
        console.error("Network error: ", error);
        return { ok: false, error: "Network error" };
    }
}