export async function meFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/user/me", {
            credentials: "include",
        });

        if (!res.ok) return null;

        return await res.json();
    } catch {
        return null;
    }
}