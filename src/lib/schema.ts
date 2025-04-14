import {z} from "zod";

export async function isMailRegistered(mail: string) {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list", {});
    const data = await res.json();
    if (data) {
        return false;
    }
    return true;
}

export const signUpSchema = z
    .object({
        email: z
            .string()
            .trim()
            .email("Invalid email format")
            .refine(isMailRegistered, "Email is already in use"),
        password: z.string().trim().min(8, "Password must have at least 8 characters"),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type SignUpSchema = z.infer<typeof signUpSchema>;
