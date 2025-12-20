export async function checkoutSession(email: string, product_id: string) {
    try {
        const res = await fetch(
            "http://127.0.0.1:3000/billing/create-checkout-session",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, product_id }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.error("Checkout session error:", data.error);
            return { ok: false, error: data.error };
        }

        return { ok: true, checkoutUrl: data.checkoutUrl };

    } catch (error) {
        return { ok: false, error: "Network error" };
    }
}