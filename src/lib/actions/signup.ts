"use server";

import {SESSION_EXP_SECONDS} from "@/config";
import {redirect} from "next/navigation";
import {createJWTSession} from "@/lib/auth/jwtSession";
import {signUpSchema} from "@/lib/schemas/signup";
import {getFieldsFromFormData} from "@/lib/utils";
import {registerUser} from "@/lib/auth/user";

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

    const user = await registerUser(parsed.data);
    await createJWTSession(user.id, "vce", SESSION_EXP_SECONDS);

    redirect("/dashboard");
}

export async function checkEmailAvailable(email: string) {
    const BASE_URL = `${process.env.BACKEND_API_URI}`;
    const res = await fetch(`${BASE_URL}/users/${email}`);
    if (res.ok) {
        console.log(`User with email ${email} already exists`);
        return false;
    }
    return true;
}
