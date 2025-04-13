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
    console.log("payload received", formData);

    if (!(formData instanceof FormData)) {
        return {
            success: false,
            errors: {error: ["Invalid Form Data"]},
        };
    }

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
            errors: {email: ["email already taken"]},
            fields: parsedFormData.data,
            message: "Email already taken",
        };
    }
    console.log("parsed data", parsedFormData.data);
    redirect("/")
}
