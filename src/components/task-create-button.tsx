"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface TaskCreateButtonProps extends ButtonProps {}

export function TaskCreateButton({ className, variant, onClick: onClickCallback, ...props }: TaskCreateButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClickCallback?.(e);
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                buttonVariants({ variant }),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className,
                "w-40"
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            New task
        </button>
    );
}
