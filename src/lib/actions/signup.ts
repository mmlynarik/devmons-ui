"use server";

import {redirect} from "next/navigation";
import {signUpSchema} from "../schema";
import {getFieldsFromFormData} from "../utils";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

export async function signUpAction(_: FormState, formData: FormData): Promise<FormState> {
    const formDataObject = Object.fromEntries(formData);
    const parsedFormData = await signUpSchema.safeParseAsync(formDataObject);

    if (!parsedFormData.success) {
        const errors = parsedFormData.error.flatten().fieldErrors;
        const fields = getFieldsFromFormData(formData);
        const formState = {
            success: false,
            fields,
            errors,
        };
        console.log("Parsing errors occured. Check formState:", formState);
        return formState;
    }

    if (parsedFormData.data.email === "miroslav.mlynarik@gmail.com") {
        console.log("Error email!");
        return {
            success: false,
            errors: {email: ["Email already taken", "AAAAAA"]},
            fields: parsedFormData.data,
        };
    }

    redirect("/");
}


export async function checkEmailAvailable(email: string) {
    const BASE_URL = `${process.env.BACKEND_API_URI}`
    const res = await fetch(`${BASE_URL}/email/${email}`);
    const data = await res.json()
    if (data.available) {
        return true;
    }
    return false;
}
