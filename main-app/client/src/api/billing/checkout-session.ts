export async function checkoutSession(plan: string) {
    try {
        const res = await fetch(
            "http://127.0.0.1:3000/billing/create-checkout-session",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.log("Response error in checkoutSessionFunction(): ", data.error); // DEBUG LOG
            return {
                ok: false,
                error: "Checkout session failed"
            };
        }

        return { ok: true, checkoutUrl: data.checkoutUrl };

    } catch (error) {
        console.log("Unexpected error in checkoutSessionFunction(): ", error); // DEBUG LOG
        return {
            ok: false,
            error: "Unexptected error"
        };
    }
}