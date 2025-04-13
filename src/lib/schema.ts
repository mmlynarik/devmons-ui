import {z} from "zod";

export const signUpSchema = z
    .object({
        email: z.string().trim().email("Invalid email format"),
        password: z.string().trim().min(8, "Password must have at least 8 characters"),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type SignUpSchema = z.infer<typeof signUpSchema>;
