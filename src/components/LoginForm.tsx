import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import FormButton from "./FormButton";
import GithubButton from "./GithubButton";
import SignInOrLine from "./SignInOrLine";

export default function LoginForm() {
    return (
        <Card className="flex w-xs flex-col gap-9">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" autoFocus />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormButton label="Log in" isPending={false} labelPending="Loggin in" />
                        <SignInOrLine />
                        <GithubButton />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center gap-1 text-sm">
                Don&apos;t have an account?
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </CardFooter>
        </Card>
    );
}
