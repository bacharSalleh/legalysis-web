"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

export function GetStartedHomeButton() {
    return (
        <Button
            className={cn(buttonVariants({ size: "lg" }), "w-2/3 py-2 text-xl h-auto")}
            onClick={() => {
                const element = document.getElementById("packages");
                element?.scrollIntoView({ behavior: "smooth" });
            }}
        >
            Get Started
        </Button>
    );
}
