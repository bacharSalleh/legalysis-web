"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
    const [isTwitterLoading, setIsTwitterLoading] = React.useState<boolean>(false);
    const searchParams = useSearchParams();

    async function onSubmit(data: FormData) {
        setIsLoading(true);

        const signInResult = await signIn("email", {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        });

        setIsLoading(false);

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            });
        }

        return toast({
            title: "Check your email",
            description: "We sent you a login link. Be sure to check your spam too.",
        });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {/* ... Your existing code ... */}
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                    setIsGoogleLoading(true);
                    signIn("google", {
                        redirect: false,
                        callbackUrl: searchParams?.get("from") || "/dashboard",
                    });
                }}
                disabled={isLoading || isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-5 w-5" /> // Replace with your Google Icon
                )}{" "}
                Google
            </button>
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                    setIsTwitterLoading(true);
                    signIn("twitter", {
                        redirect: false,
                        callbackUrl: searchParams?.get("from") || "/dashboard",
                    });
                }}
                disabled={isLoading || isTwitterLoading}
            >
                {isTwitterLoading ? (
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Icons.twitter className="mr-2 h-5 w-5" /> // Replace with your Twitter Icon
                )}{" "}
                Twitter
            </button>
        </div>
    );
}
