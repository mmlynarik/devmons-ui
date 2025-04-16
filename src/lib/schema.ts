import {z} from "zod";

let lastValue: string | null = null;
let lastResult: boolean | null = null;

export async function checkEmailAvailable(email: string) {
    const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URI}`
    const res = await fetch(`${BASE_URL}/email/${email}`);
    const data = await res.json()
    if (data.available) {
        return true;
    }
    console.log("Mail already exists, try again");
    return false;
}

export async function checkEmailAvailableOnActive(value: string) {
    if (value === lastValue && lastResult !== null) {
        return lastResult;
    }
    const result = await checkEmailAvailable(value);
    lastValue = value;
    lastResult = result;
    return result;
}

export const signUpSchema = z
    .object({
        email: z
            .string()
            .trim()
            .email("Invalid email format")
            .refine(checkEmailAvailableOnActive, "Email is already in use"),
        password: z.string().trim().min(8, "Password must have at least 8 characters"),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type SignUpSchema = z.infer<typeof signUpSchema>;
