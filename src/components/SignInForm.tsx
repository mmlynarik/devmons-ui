import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function SignInForm({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-gray-100">
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
                  placeholder="john.firth@example.com"
                  required
                  autoFocus
                  className="bg-white focus-visible:ring-0 focus:outline-1 focus:outline-sky-500 focus:outline-solid"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white focus-visible:ring-0 focus:outline-1 focus:outline-sky-500 focus:outline-solid"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Sign in with Github
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
    </div>
  );
}
