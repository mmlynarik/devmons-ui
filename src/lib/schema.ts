import {z} from "zod";

export const signUpSchema = z.object({
    email: z.string().trim().email({message: "Invalid email"}),
    password: z.string().trim().min(8, {message: "Password must have at least 8 characters"}),
    confirmPassword: z.string().trim()
}).refine((data) => data.password === data.confirmPassword, {message: "Passwords must match"})


export type SignUpSchema = z.infer<typeof signUpSchema>;
