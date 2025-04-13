"use server";

import {redirect} from "next/navigation";
import {signUpSchema} from "./schema";
import {getFieldsFromFormData} from "./utils";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

export async function signUpAction(_: FormState, formData: FormData): Promise<FormState> {
    const formDataObject = Object.fromEntries(formData);
    const parsedFormData = signUpSchema.safeParse(formDataObject);

    if (!parsedFormData.success) {
        const errors = parsedFormData.error.flatten().fieldErrors;
        const fields = getFieldsFromFormData(formData);
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
    redirect("/");
}
