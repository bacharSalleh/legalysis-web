import { ResultHeader } from "@/components/results-header";
import { ResultShell } from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <ResultShell>
            <ResultHeader result={null} />

            <div className="mx-auto max-w-[64rem] p-4 divide-border-200 divide-y rounded-md ">
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
            </div>
        </ResultShell>
    );
}

function SkeletonLoading() {
    return (
        <div className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    );
}
