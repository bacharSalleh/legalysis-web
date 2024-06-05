import { LoginButton } from "@/components/login-btn";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { resultConfig } from "@/config/result";
import { getCurrentUser } from "@/lib/session";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
    const user = await getCurrentUser();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={resultConfig.nav.items} />
                    <div className="flex space-x-8">
                        {/* <ModeToggle /> */}
                        <nav className="flex items-center">
                            {user ? <UserAccountNav user={user} /> : <LoginButton />}
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
