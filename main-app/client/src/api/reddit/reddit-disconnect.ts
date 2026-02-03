export async function redditDisconnectFunction() {
    const res = await fetch("http://127.0.0.1:3000/reddit/disconnect", {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    return data;
}