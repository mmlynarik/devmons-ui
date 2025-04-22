"use server";

import {redirect} from "next/navigation";
import {getFieldsFromFormData} from "../utils";
import {loginSchema} from "../schemas/login";
import {getUser} from "../auth/user";
import {verifyPassword} from "../auth/passwordHasher";
import {SESSION_EXP_SECONDS} from "@/config";
import { createAndStoreJWTSession } from "../auth/jwtSession";

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
        return {success: false, fields, errors};
    }

    const user = await getUser(parsed.data.email);
    if (!user) {
        return {success: false};
    }

    const isVerifiedPassword = verifyPassword(parsed.data.password, user.password, user.salt);
    if (!isVerifiedPassword) {
        return {success: false}
    }

    await createAndStoreJWTSession(user.id, "vce", SESSION_EXP_SECONDS);
    console.log(`User ${user.email} logged in`);

    redirect("/dashboard");
}
