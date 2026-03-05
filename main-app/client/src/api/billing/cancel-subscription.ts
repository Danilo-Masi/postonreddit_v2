export async function cancelSubscriptionFunction() {
    try {
        const res = await fetch("http://127.0.0.1:3000/billing/cancel-subscription", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in cancelSubscriptionFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Subscription cancellation failed"
            }
        }

        return { ok: true };

    } catch (error) {
        console.log("Unexpected error in cancelSubscriptionFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        }
    }

}