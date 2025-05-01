import {createJWTSession, setJWTSessionHeader} from "@/lib/auth/jwtSession";
import {getGithubUser, getUserbyGithubId, registerUserOnGithubLogin} from "@/lib/auth/user";
import {redirect} from "next/navigation";
import {type NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams;
    const code = queryParams.get("code");
    if (!code) {
        throw new Error("Github authentication failed");
    }

    const githubUser = await getGithubUser(code);
    let user = await getUserbyGithubId(githubUser.id);
    if (!user) {
        user = await registerUserOnGithubLogin(githubUser);
    }
    const {access_token, refresh_token} = await createJWTSession(user.id);
    await setJWTSessionHeader(access_token, refresh_token);
    console.log(`User with id=${user.id} logged in`);

    redirect("/dashboard");
}
