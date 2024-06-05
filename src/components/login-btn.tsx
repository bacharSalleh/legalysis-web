import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function LoginButton() {
    return (
        <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "px-4 bg-background")}>
            Login
        </Link>
    );
}
