export async function cancelSubscriptionFunction() {
    const res = await fetch("http://127.0.0.1:3000/billing/cancel-subscription", {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    return { ok: res.ok, error: data.error };
}