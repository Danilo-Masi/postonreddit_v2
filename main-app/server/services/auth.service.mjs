import { supabase } from "../config/supabase.mjs";

// Function to validate user authentication
export async function getAuthenticatedUser(accessToken) {
    if (!accessToken) {
        throw new Error("NOT_AUTHENTICATED");
    }

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data?.user) {
        throw new Error("INVALID_TOKEN");
    }
    
    return data.user;
}