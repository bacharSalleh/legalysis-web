import { redirect } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { dashboardConfig } from "@/config/dashboard";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
    children?: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const user = await getCurrentUser();

    if (!user) {
        return redirect(authOptions?.pages?.signIn || "/login");
    }

    // if (!userId) {
    //     return notFound();
    // }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                    <div className="flex space-x-8">
                        {/* <ModeToggle /> */}
                        <nav className="flex items-center">
                            <UserAccountNav user={user} />
                        </nav>
                    </div>
                </div>
            </header>
            <div className="container flex-1 gap-12 md:grid-cols-[1fr]">
                <main className="flex w-full flex-1 flex-col">{children}</main>
            </div>
            <SiteFooter className="border-t" />
        </div>
    );
}
