import * as React from "react";

import { cn } from "@/lib/utils";

interface ResultShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ResultShell = ({ children, className, ...props }: ResultShellProps) => {
    return (
        <section
            className={cn("container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24", className)}
            {...props}
        >
            {children}
        </section>
    );
};
