import {
    JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
    JWT_AUDIENCE,
    JWT_REFRESH_TOKEN_EXPIRY_SECONDS,
    JWT_SECRET_KEY,
} from "@/config";
import {JWTPrivateClaims, jwtSchema} from "@/lib/schemas/jwt";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import "server-only";

const JWT_SECRET_KEY_ENCODED = new TextEncoder().encode(JWT_SECRET_KEY);

export async function getSignedJWT(payload: JWTPrivateClaims, expiresAt: Date) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .setAudience(JWT_AUDIENCE)
        .sign(JWT_SECRET_KEY_ENCODED);
}

export async function verifyJWT(token: string): Promise<boolean> {
    const payload = (await jwtVerify(token, JWT_SECRET_KEY_ENCODED, {algorithms: ["HS256"]})).payload;
    return (await jwtSchema.safeParseAsync(payload)).success;
}

export async function createJWTSession(userId: number) {
    const accessTokenExpiryDate = getTokenExpiryDate(JWT_ACCESS_TOKEN_EXPIRY_SECONDS);
    const refreshTokenExpiryDate = getTokenExpiryDate(JWT_REFRESH_TOKEN_EXPIRY_SECONDS);

    const access_token = await getSignedJWT({userId}, accessTokenExpiryDate);
    const refresh_token = await getSignedJWT({userId}, refreshTokenExpiryDate);

    return {access_token, refresh_token}
}

export async function setJWTSessionHeader(access_token: string, refresh_token: string) {
    const cookieStore = await cookies();
    cookieStore.set("access", access_token, {
        httpOnly: true,
        secure: true,
        expires: getTokenExpiryDate(JWT_ACCESS_TOKEN_EXPIRY_SECONDS),
        sameSite: "lax",
        path: "/",
    });
    cookieStore.set("refresh", refresh_token, {
        httpOnly: true,
        secure: true,
        expires: getTokenExpiryDate(JWT_REFRESH_TOKEN_EXPIRY_SECONDS),
        sameSite: "lax",
        path: "/",
    });
}

function getTokenExpiryDate(expiration_seconds: number) {
    return new Date(Date.now() + expiration_seconds * 1000);
}

export async function deleteJWTSession() {
    const cookieStore = await cookies();
    cookieStore.delete("access");
    cookieStore.delete("refresh");
}
