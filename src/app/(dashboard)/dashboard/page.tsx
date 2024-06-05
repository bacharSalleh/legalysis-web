import { Skeleton } from "@/components/ui/skeleton";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardPageClient from "./components/dashboard-page";
import DashboardWrapper from "./components/dashboard-wrapper";

export const metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        return redirect(authOptions?.pages?.signIn || "/login");
    }

    return <DashboardWrapper user={user} />;
}

DashboardPage.Skeleton = function PostItemSkeleton() {
    return (
        <div className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    );
};
