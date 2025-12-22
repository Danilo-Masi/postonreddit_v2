export async function meFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/user/me", {
            credentials: "include",
        });

        // User is not authenticated
        if (res.status === 401) {
            return null;
        }

        // Unexpected error
        if (!res.ok) {
            console.error("meFunction error:", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("meFunction network error:", err);
        return null;
    }
}