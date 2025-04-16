"use server";

import { redirect } from "next/navigation";
import { signUpSchema } from "../schemas/signup";
import { getFieldsFromFormData } from "../utils";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

export async function signUpAction(_: FormState, formData: FormData): Promise<FormState> {
    const formDataObject = Object.fromEntries(formData);
    const parsed = await signUpSchema.safeParseAsync(formDataObject);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const fields = getFieldsFromFormData(formData);
        const formState = {
            success: false,
            fields,
            errors,
        };
        console.log("Parsing errors occured. Check formState:", formState);
        return formState;
    }

    const payload = JSON.stringify({email: parsed.data.email, password: parsed.data.email});
    const res = await fetch(`${process.env.BACKEND_API_URI}/signup`, {
        method: "POST",
        body: payload,
        headers: {"Content-Type": "application/json"},
    });
    const data = await res.json();
    console.log(data);
    redirect("/login");
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
