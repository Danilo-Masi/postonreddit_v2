import { supabaseAdmin } from "../config/supabase.mjs";

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_SECRET_KEY;

export async function redditRefresh(refresh_token, userId) {
    if (!refresh_token || !userId) {
        return { ok: false, reason: "NOT_AUTHENTICATED" };
    }

    try {
        // Call to Reddit
        const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
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
            console.error("Reddit token refresh failed: ", tokenData);
            return { ok: false, reason: "REDDIT_ERROR" };
        }

        const { access_token, expires_in, refresh_token: new_refresh_token } = tokenData;

        if (!access_token || !expires_in) {
            console.error("Malformed Reddit token response: ", tokenData);
            return { ok: false, reason: "INVALID_TOKEN_RESPONSE" };
        }

        // Deadline update
        const token_expiry = new Date(Date.now() + (expires_in - 60) * 1000).toISOString();

        // Update DB
        const { error } = await supabaseAdmin
            .from("reddit_tokens")
            .update({
                access_token,
                token_expiry,
                ...(new_refresh_token && { refresh_token: new_refresh_token }),
            })
            .eq("user_id", userId);

        if (error) {
            console.error("DB update error during Reddit refresh: ", error);
            return { ok: false, reason: "DB_ERROR" };
        }

        return { ok: true };

    } catch (err) {
        console.error("Unexpected redditRefresh error: ", err);
        return { ok: false, reason: "UNEXPECTED_ERROR" };
    }
}