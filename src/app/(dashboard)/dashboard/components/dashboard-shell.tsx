"use client";

import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardShell = ({ children, className, ...props }: DashboardShellProps) => {
    return (
        <div className={cn("flex flex-col items-stretch gap-8", className)} {...props}>
            {children}
        </div>
    );
};

export default DashboardShell;
