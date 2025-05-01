import {JWT_SECRET_KEY} from "@/config";
import {JWTPrivateClaims, jwtSchema} from "@/lib/schemas/jwt";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import "server-only";

const encodedKey = new TextEncoder().encode(JWT_SECRET_KEY);

export async function getSignedJWT(payload: JWTPrivateClaims, expiresAt: Date, aud: string) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .setAudience(aud)
        .sign(encodedKey);
}

export async function verifyJWT(token: string): Promise<boolean> {
    const payload = (await jwtVerify(token, encodedKey, {algorithms: ["HS256"]})).payload;
    return (await jwtSchema.safeParseAsync(payload)).success;
}

export async function createJWTSession(userId: number, aud: string, expires_after_secs: number) {
    const expiresAt = new Date(Date.now() + expires_after_secs * 1000);
    const access_token = await getSignedJWT({userId}, expiresAt, aud);
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function deleteJWTSession() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
}
