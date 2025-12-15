export async function logoutFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            return { ok: false, error: data.error || "Logout failed" };
        }

        return { ok: true };

    } catch (error: any) {
        console.error("Network error: ", error);
        return { ok: false, error: "Network error" };
    }
}