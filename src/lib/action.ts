"use server";

import {redirect} from "next/navigation";
import {signUpSchema} from "./schema";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function signUpAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const formDataAsObject = Object.fromEntries(formData);
    console.log("form data", formData);

    const parsedFormData = signUpSchema.safeParse(formDataAsObject);

    if (!parsedFormData.success) {
        const errors = parsedFormData.error.flatten().fieldErrors;
        const fields: Record<string, string> = {};

        for (const key of Object.keys(formData)) {
            fields[key] = formDataAsObject[key].toString();
        }
        console.log("error returned data", formData);
        console.log("error returned error", errors);
        return {
            success: false,
            fields,
            errors,
        };
    }

    if (parsedFormData.data.email === "miroslav.mlynarik@gmail.com") {
        console.log("Error email!");
        return {
            success: false,
            errors: {email: ["Email already taken"]},
            fields: parsedFormData.data,
        };
    }
    console.log("parsed data", parsedFormData.data);
    redirect("/")
}
