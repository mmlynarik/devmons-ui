import "server-only";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: number;
    aud: string;
};

export async function encrypt(payload: SessionPayload, expiresAt: Date) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {algorithms: ["HS256"]});
        return payload;
    } catch (error) {
        console.log(`Failed to verify session ${error}`);
    }
}

export async function createSession(userId: number, aud: string, expires_after_secs: number) {
    const expiresAt = new Date(Date.now() + expires_after_secs * 1000);
    const session = await encrypt({userId, aud}, expiresAt);
    const cookieStore = await cookies();
    cookieStore.set("access_token", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/dashboard",
    });
}
