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
            console.log("Response error in meFunction(): ", res.text); // DEBUG LOG
            return {
                logged: false,
                paying: false,
                error: "Fetching user info failed"
            };
        }

        const data = await res.json();

        return data;

    } catch (error) {
        console.log("Unexpected error in meFunction(): ", error); // DEBUG LOG
        return {
            logged: false,
            paying: false,
            error: "Unexptected error"
        }
    }
}