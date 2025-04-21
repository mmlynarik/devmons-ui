import "server-only";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type TokenPrivateClaims = {
    userId: number;
};

export async function encrypt(payload: TokenPrivateClaims, expiresAt: Date, aud: string) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .setAudience(aud)
        .sign(encodedKey);
}

export async function decrypt(token: string) {
    return (await jwtVerify(token, encodedKey, {algorithms: ["HS256"]})).payload;
}

export async function createSession(userId: number, aud: string, expires_after_secs: number) {
    const expiresAt = new Date(Date.now() + expires_after_secs * 1000);
    const session = await encrypt({userId}, expiresAt, aud);
    const cookieStore = await cookies();
    cookieStore.set("access_token", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}
