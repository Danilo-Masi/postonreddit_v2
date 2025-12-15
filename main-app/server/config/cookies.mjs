export const cookiesOptions = {
    path: "/",
    httpOnly: true,
    secure: false, // Set to true if using HTTPS // TODO
    sameSite: "none", // Adjust based on your requirements // TODO
    maxAge: 60 * 60 * 24 * 30, // 30 days TODO
}