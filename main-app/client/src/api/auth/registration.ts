export async function registrationFunction(name: string, email: string, password: string, plan: string | null) {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password, plan }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { ok: false, error: data.error || "Registration failed" };
        }
        
        return data;

    } catch (error: any) {
        console.error("Network error: ", error);
        return { ok: false, error: "Network error" };
    }
}   