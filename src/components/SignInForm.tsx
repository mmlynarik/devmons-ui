import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {GitHubIcon} from "@/icons/github";
import Link from "next/link";

export function SignInForm() {
  return (
    <Card className="flex flex-col gap-6 bg-gray-100 w-xs">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="active:focus-none grid gap-3 focus:border-none focus:outline-none active:border-none">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                required
                autoFocus
                className="bg-white placeholder:font-extralight focus:outline-1 focus:outline-sky-500 focus:outline-solid focus-visible:ring-0"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="bg-white placeholder:font-extralight focus:outline-1 focus:outline-sky-500 focus:outline-solid focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
              >
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="text-muted-foreground relative z-10 bg-gray-100 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                className="w-full bg-gray-600 text-white hover:bg-gray-700 hover:text-white active:bg-gray-800 active:text-white"
                asChild
              >
                <Link
                  href="https://www.github.com"
                  className="flex items-center gap-3"
                >
                  <span className="fill-current">
                    <GitHubIcon />
                  </span>
                  <span>Sign in with Github</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
