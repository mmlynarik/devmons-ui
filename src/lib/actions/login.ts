"use server";

import {redirect} from "next/navigation";
import {getFieldsFromFormData} from "../utils";
import {loginSchema} from "../schemas/login";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
    const formDataObject = Object.fromEntries(formData);
    const parsed = loginSchema.safeParse(formDataObject);

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

    if (parsed.data.email === "miroslav.mlynarik@gmail.com") {
        console.log("Error email!");
        return {
            success: false,
            errors: {email: ["Email already taken", "AAAAAA"]},
            fields: parsed.data,
        };
    }

    redirect("/");
}
