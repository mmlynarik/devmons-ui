"use server";

import {SESSION_EXP_SECONDS, SIGNUP_URL} from "@/config";
import {redirect} from "next/navigation";
import {generateSalt, hashPassword} from "../auth/passwordHasher";
import {createSession} from "../auth/session";
import {signUpSchema} from "../schemas/signup";
import {getFieldsFromFormData} from "../utils";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

export async function signUpAction(formState: FormState, formData: FormData): Promise<FormState> {
    const formDataAsObject = Object.fromEntries(formData);
    const parsed = await signUpSchema.safeParseAsync(formDataAsObject);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const fields = getFieldsFromFormData(formData);
        return {success: false, fields, errors};
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(parsed.data.password, salt);

    const payload = JSON.stringify({email: parsed.data.email, password: hashedPassword, salt: salt});
    const res = await fetch(SIGNUP_URL, {
        method: "POST",
        body: payload,
        headers: {"Content-Type": "application/json"},
    });
    const data = await res.json();
    await createSession(data.id, "vce", SESSION_EXP_SECONDS);

    redirect("/dashboard");
}

export async function checkEmailAvailable(email: string) {
    const BASE_URL = `${process.env.BACKEND_API_URI}`;
    const res = await fetch(`${BASE_URL}/email/${email}`);
    const data = await res.json();
    if (data.available) {
        return true;
    }
    return false;
}
