export async function createPostFunction() {

    // DA MODIFICA CON I DATI REALI // TODO

    const res = await fetch("http://127.0.0.1:3000/post/create-post", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Where would you start today if you had to get your first users?",
            content: `This might sound like a very basic question, it’s something you see everywhere online and here on Reddit too:

“How do you get your first users when you start with zero audience?”

But is there actually a real, practical answer to this?

I’ve read a lot of articles, posts, and threads about it. Most of the advice seems to repeat the same things: cold emails, “just start posting online,” build a personal brand, be active on X, LinkedIn, Reddit, etc. And sure, that probably works for some people.

But what if you just want to build your SaaS, put it out there, maybe do some marketing, without making yourself the product?

No existing audience.

No followers.

No personal brand.

No desire to be constantly visible or to turn your life into content.

I’m currently building a SaaS, and I keep coming back to this question. I’m not looking for hacks or growth tricks. I’m honestly trying to understand the simplest path someone with zero experience in marketing could follow to get their first real users.

If you’ve been in this situation before, or you’ve seen something work that isn’t just “be everywhere online”, how did you approach it?

Where would you start today if you had to get your first users from scratch, without putting yourself front and center?`,
            subredditTargets: [
                {
                    subreddit: "SaaS",
                    flairId: "123456",
                    scheduledAt: new Date(Date.now() + 60000 * 1000).toISOString(),
                },
                {
                    subreddit: "EntrepreneurRideAlogn",
                    flairId: "123456222",
                    scheduledAt: new Date(Date.now() + 60000 * 1000).toISOString(),
                },
            ]
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Create post error: " + data.error);
        return { ok: false, error: data.error };
    }

    return { ok: res.ok, error: data.error };
}