"use server";

import {SESSION_EXP_SECONDS} from "@/config";
import {redirect} from "next/navigation";
import {createJWTSession} from "../auth/jwtSession";
import {verifyPassword} from "../auth/passwordHasher";
import {getUserByEmail} from "../auth/user";
import {loginSchema} from "../schemas/login";
import {getFieldsFromFormData} from "../utils";

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

    const user = await getUserByEmail(parsed.data.email);
    if (!user) {
        return {success: false, errors: {root: ["Incorrect email or password"]}};
    }

    const isVerifiedPassword = await verifyPassword(parsed.data.password, user.password, user.salt);
    if (!isVerifiedPassword) {
        return {success: false, errors: {root: ["Incorrect email or password"]}};
    }

    await createJWTSession(user.id, "vce", SESSION_EXP_SECONDS);
    console.log(`User ${user.email} logged in`);

    redirect("/dashboard");
}
