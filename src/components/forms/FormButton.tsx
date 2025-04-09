import { Button } from "@/components/ui/button";

export function FormButton() {
    return (
        <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
        >
            Sign in
        </Button>
    );
}
