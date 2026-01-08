import z from "zod";

const baseAuthSchema = {
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password is too long")
        .refine((val) => !val.includes(" "), {
            message: "Password cannot contain spaces",
        }),
};

export const loginSchema = z.object({
    ...baseAuthSchema,
});

export const registrationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(128, "Name is too long"),

    ...baseAuthSchema,
});