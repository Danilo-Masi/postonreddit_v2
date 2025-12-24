export async function meFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/user/me", {
            credentials: "include",
        });

        if (res.status === 401) {
            return {
                logged: false,
                paying: false,
            };
        }

        if (!res.ok) {
            console.error("Error in meFunction: ", res.status);
            return {
                logged: false,
                paying: false,
            };
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error("meFunction network error:", err);
        return {
            logged: false,
            paying: false,
        }
    }
}