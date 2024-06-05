"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RemoveTaskDialogProps {
    triggerChildren?: React.ReactNode;
    taskId: string;
    children?: React.ReactNode;
    onRegenerateAPIKeyClick: () => void;

    [key: string]: any;
}

export const GenerateApiKeyDialog = React.forwardRef<HTMLDivElement, RemoveTaskDialogProps>((props, forwardedRef) => {
    const { triggerChildren, children, onOpenChange, taskId, onRegenerateAPIKeyClick, ...itemProps } = props;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/generate-apikey`, {
                method: "GET",
            });

            if (!res?.ok) {
                return toast({
                    title: "Something went wrong.",
                    description: "Sorry for that. Please try again.",
                    variant: "destructive",
                });
            }

            return toast({
                title: "API Key generated successfully.",
                variant: "success",
            });
        } catch (err) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again or Call support",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
            setOpen(false);
            onRegenerateAPIKeyClick();
            router.refresh();
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open: boolean) => {
                if (isSubmitting) return;
                setOpen(open);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Icons.generate className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to generate/regenerate your api key ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" onClick={handleClick}>
                        {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});
