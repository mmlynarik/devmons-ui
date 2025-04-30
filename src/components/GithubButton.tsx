import {GitHubIcon} from "@/components/GithubIcon";
import {Button} from "./ui/button";
import {githubLogin} from "@/lib/actions/login";

export default function GithubButton() {
    return (
        <Button
            type="button"
            className="w-full bg-gray-600 text-white hover:bg-gray-700 hover:text-white active:bg-gray-800 active:text-white"
            onClick={githubLogin}
        >
            <div className="flex items-center gap-3">
                <span className="fill-current">
                    <GitHubIcon />
                </span>
                <span>Sign in with Github</span>
            </div>
        </Button>
    );
}
