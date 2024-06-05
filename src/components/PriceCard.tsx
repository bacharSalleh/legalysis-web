"use client";

import React, { HTMLAttributes } from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { TypographyH2 } from "./ui/typography";
import { toast } from "./ui/use-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingCardProps extends HTMLAttributes<HTMLElement> {
  title: string;
  packName: string;
  price: string;
  userId: string | null;
  contactSales?: boolean;
  freePack?: boolean;
}

export function MonthlyPricingCard({
  title,
  price,
  userId,
  packName,
  contactSales,
  freePack,
  children,
  ...props
}: PricingCardProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const handleClick = async () => {
    return router.replace(`/pricing?plan=${packName}`);
  };

  const handleContactSales = () => {
    window.location.href = "mailto:sales@legalysis.co";
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 min-h-[350px]">
      <div className="flex h-full flex-col justify-between rounded-md px-6 py-2 gap-y-4">
        <div>
          <div className="flex flex-col items-center">
            <TypographyH2 className="border-none">{title}</TypographyH2>
            {!contactSales && (
              <h3 className="mt-3">
                <span className="text-xl">${price}</span>
              </h3>
            )}
            {children}
          </div>
        </div>
        {contactSales ? (
          <Button
            variant={"default"}
            className="w-full"
            onClick={handleContactSales}
          >
            Contact Sales
          </Button>
        ) : freePack ? (
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Try For Free
          </Link>
        ) : (
          <Button
            variant={"default"}
            className="w-full"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Purchase
          </Button>
        )}
      </div>
    </div>
  );
}
