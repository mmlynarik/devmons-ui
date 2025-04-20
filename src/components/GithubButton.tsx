import { GitHubIcon } from "@/components/GithubIcon";
import Link from "next/link";
import { Button } from "./ui/button";

export default function GithubButton() {
    return (
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
    );
}
