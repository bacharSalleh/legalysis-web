import { DashboardHeader } from "@/components/header";
import { TaskCreateButton } from "@/components/task-create-button";
import DashboardPage from "./page";
import DashboardShell from "./components/dashboard-shell";

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Tasks" text="Create and manage tasks.">
                <TaskCreateButton />
            </DashboardHeader>
            <div className="divide-border-200 divide-y rounded-md border">
                <DashboardPage.Skeleton />
                <DashboardPage.Skeleton />
                <DashboardPage.Skeleton />
                <DashboardPage.Skeleton />
                <DashboardPage.Skeleton />
            </div>
        </DashboardShell>
    );
}
