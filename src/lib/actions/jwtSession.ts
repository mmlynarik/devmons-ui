"use server";

import {JWT_REFRESH_IF_LESS_THAN} from "@/config";
import {cookies} from "next/headers";
import {createJWTSession, setJWTSessionHeader, verifyJWT} from "../auth/jwtSession";
import {getUserById} from "../auth/user";
import {JWTSchema, jwtSchema} from "../schemas/jwt";
import {logout} from "./logout";

function getSecondsUntilExpiration(payload: JWTSchema) {
    const expiration = new Date(payload.exp * 1000);
    const now = new Date();
    return (expiration.getTime() - now.getTime()) / 1000;
}

export async function refreshJWTSession() {
    const cookieStore = await cookies();
    const current_refresh_token = cookieStore.get("refresh")?.value;
    if (!current_refresh_token) {
        return logout();
    }
    const unsafePayload = await verifyJWT(current_refresh_token);
    const parsedPayload = await jwtSchema.safeParseAsync(unsafePayload);
    if (!parsedPayload.success) {
        return logout();
    }
    const payload = parsedPayload.data;
    const user = await getUserById(payload.userId);
    if (!user) {
        return logout();
    }
    const {access_token, refresh_token} = await createJWTSession(payload.userId);
    const secondsUntilExpiration = getSecondsUntilExpiration(payload);
    if (secondsUntilExpiration < JWT_REFRESH_IF_LESS_THAN) {
        await setJWTSessionHeader(access_token, refresh_token);
    } else {
        await setJWTSessionHeader(access_token, undefined);
    }
}
