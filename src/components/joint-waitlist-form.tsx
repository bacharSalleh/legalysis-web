"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { joinWaitlistSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "./icons";

export function JoinWaitlistForm() {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        control,
    } = useForm<z.infer<typeof joinWaitlistSchema>>({
        resolver: zodResolver(joinWaitlistSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof joinWaitlistSchema>) {
        setIsSaving(true);
        try {
            const res = await fetch("/api/join-waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            });

            if (!res?.ok) {
                const errorMessage = await res.json();
                if (
                    errorMessage.message &&
                    typeof errorMessage.message == "string" &&
                    (errorMessage.message as string).startsWith("You are already")
                ) {
                    return toast({
                        title: "You're Already on the List",
                        description:
                            "Looks like this email is already registered. We'll keep you updated on our API launch!",
                        variant: "default",
                    });
                }

                return toast({
                    title: "Something went wrong.",
                    description: "Sorry for that. Please try again or Call support",
                    variant: "destructive",
                });
            }

            return toast({
                title: "🎉 Registration Successful!",
                description:
                    "You have been successfully added to our waitlist. We will notify you when our API is ready!",
                variant: "success",
            });
        } catch (err) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again or Call support",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
            reset();
        }
    }

    return (
        <div className="flex-col items-center gap-4 text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="name" className="text-muted-foreground">
                        <b>Excited about our APIs?</b> Join our waitlist to get notified.
                    </Label>
                    <div className="flex space-x-2">
                        <div className="flex flex-col gap-2 items-start">
                            <Input
                                id="name"
                                placeholder="Email"
                                className="w-full md:w-full"
                                size={32}
                                {...register("email")}
                                disabled={isSaving}
                            />
                            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            size={"default"}
                            className="w-auto"
                            variant={"secondary"}
                            disabled={isSaving}
                        >
                            {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Join
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
