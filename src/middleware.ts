import {IsJWTOk} from "@/lib/auth/jwtSession";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const access_token = (await cookies()).get("access")?.value;
    const jwtOK = await IsJWTOk(access_token);

    if (isProtectedRoute && !jwtOK) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (isPublicRoute && jwtOK) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.next();
}

// Routes on which middleware should not run
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
