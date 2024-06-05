import * as React from "react";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn(className, "bg-[#713528] border-t-2 border-input text-white/70")}>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col pb-4 md:pb-0 items-center gap-2 px-8 md:flex-row md:gap-2 md:px-0">
                    <Icons.logo />
                    <p className="text-center text-sm text-white/70 leading-loose md:text-left">
                        Built by{" "}
                        <a
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            bach__92
                        </a>
                        .
                    </p>
                </div>
                <div className="flex flex-col items-center gap-2 md:flex-row text-sm leading-loose text-white/70">
                    <Link href="/terms" className="font-medium underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link href="/privacy" className="font-medium underline underline-offset-4">
                        Privacy Policy
                    </Link>
                    <div className="hidden md:flex md:mx-4">|</div>
                    <Link href="mailto:support@legalysis.co" target="_blank" className="underline-offset-4 underline">
                        support@legalysis.co
                    </Link>
                </div>
            </div>
        </footer>
    );
}
