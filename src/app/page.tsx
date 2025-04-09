import { SignInForm } from "@/components/forms/SignInForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="grid max-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-15 font-[family-name:var(--font-geist-sans)] sm:p-15">
            <main className="row-start-2 flex flex-col items-center gap-12">
                <h1 className="items-center justify-center text-3xl">
                    Welcome to Virtual Crypto Exchange
                </h1>
                <SignInForm />
            </main>

            <footer className="row-start-3 flex justify-center">
                <Link
                    href="https://nextjs.org/"
                    className="flex items-center gap-3"
                >
                    Powered by
                    <Image
                        className="dark:invert"
                        src="/nextjs-icon.svg"
                        alt="Next.js logo"
                        width={32}
                        height={32}
                        priority
                    />
                </Link>
            </footer>
        </div>
    );
}
