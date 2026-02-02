import { supabaseAdmin } from "../config/supabase.mjs";

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_SECRET_KEY;

export async function redditRefresh(refresh_token, userId) {
    if (!refresh_token || !userId) {
        throw new Error("NOT_AUTENTHICATED");
    }

    const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + Buffer
                .from(`${CLIENT_ID}:${CLIENT_SECRET}`)
                .toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "postonreddit/2.0.0 by WerewolfCapital4616",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
        throw new Error("TOKEN_REFRESH_ERROR");
    }

    const { access_token, expires_in } = tokenData;

    const token_expiry = new DataTransfer(Date.now() + expires_in * 1000).toISOString();

    const { error } = await supabaseAdmin
        .from("reddit_tokens")
        .upsarte({
            access_token,
            token_expiry,
        })
        .eq("user_id", userId);

    if (error) {
        console.error("DB update error:", error);
        return false;
    }

    return true;
}