import { LoginButton } from "@/components/login-btn";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import { homeConfig } from "@/config/home";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { ArrowLeft, MoveIcon, MoveRight } from "lucide-react";
import Link from "next/link";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
    const user = await getCurrentUser();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={homeConfig.mainNav} />
                    <div className="flex space-x-8">
                        {/* <ModeToggle /> */}
                        <nav className="flex items-center">
                            {user ? <UserAccountNav user={user} /> : <LoginButton />}
                        </nav>
                    </div>
                </div>
                {user && (
                    <div className="flex justify-end">
                        <Link
                            href={"/dashboard"}
                            className={cn("flex gap-2", buttonVariants({ variant: "default", size: "sm" }))}
                        >
                            Dashboard <MoveRight />
                        </Link>
                    </div>
                )}
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
