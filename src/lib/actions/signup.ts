"use server";

import { BACKEND_API_URI, JWT_SESSION_EXP_SECONDS } from "@/config";
import { createJWTSession } from "@/lib/auth/jwtSession";
import { registerUserOnSignUp } from "@/lib/auth/user";
import { signUpSchema } from "@/lib/schemas/signup";
import { getFieldsFromFormData } from "@/lib/utils";
import { redirect } from "next/navigation";

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

    const user = await registerUserOnSignUp(parsed.data);
    await createJWTSession(user.id, "vce", JWT_SESSION_EXP_SECONDS);

    redirect("/dashboard");
}

export async function checkEmailAvailable(email: string) {
    const res = await fetch(`${BACKEND_API_URI}/users/${email}`);
    if (res.ok) {
        console.log(`User with email ${email} already exists`);
        return false;
    }
    return true;
}
