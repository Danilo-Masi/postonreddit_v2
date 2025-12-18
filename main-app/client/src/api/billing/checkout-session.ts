export async function checkoutSession(email: string, product_id: string) {
    try {
        const res = await fetch("http://127.0.0.1:3000/billing/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, product_id }),
        });

        let data;
        try {
            data = await res.json();
            console.log(data); // Debug log
        } catch {
            return { ok: false, error: "Invalid JSON response from server" };
        }

        if (!res.ok) {
            return { ok: false, error: data?.error || "Checkout session creation failed" };
        }

        return { ok: true, checkoutUrl: data.checkoutUrl };

    } catch (error: any) {
        console.error("Network error: ", error);
        return { ok: false, error: "Network error" };
    }
}