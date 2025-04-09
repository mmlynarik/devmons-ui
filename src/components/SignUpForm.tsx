import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import FormButton from "./FormButton";
import Link from "next/link";

export default function SignUpForm() {
    return (
        <Card className="flex w-xs flex-col gap-9">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            autoFocus
                        />
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
                        <Label htmlFor="password">Confirm password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>
                    <FormButton name="Sign up" />
                </form>
            </CardContent>
            <CardFooter className="flex justify-center gap-1 text-sm">
                Already have an account?
                <Link href="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </CardFooter>
        </Card>
    );
}
