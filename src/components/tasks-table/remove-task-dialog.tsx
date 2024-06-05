"use client";

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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Icons } from "../icons";
import { toast } from "../ui/use-toast";

interface RemoveTaskDialogProps {
    triggerChildren?: React.ReactNode;
    taskId: string;
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    [key: string]: any;
}

export const RemoveTaskMenuItem = React.forwardRef<HTMLDivElement, RemoveTaskDialogProps>((props, forwardedRef) => {
    const { triggerChildren, children, onOpenChange, taskId, ...itemProps } = props;

    const [isRemoving, setIsRemoving] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setIsRemoving(true);
        try {
            const res = await fetch(`/api/tasks?taskId=${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res?.ok) {
                return toast({
                    title: "Something went wrong.",
                    description: "Sorry for that. Please try again.",
                    variant: "destructive",
                });
            }

            return toast({
                title: "Task removed successfully.",
                description: `#${taskId} has been removed.`,
                variant: "success",
            });
        } catch (err) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again or Call support",
                variant: "destructive",
            });
        } finally {
            setIsRemoving(false);
            setOpen(false);
            setTimeout(() => onOpenChange?.(false), 70);
            router.refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    {...itemProps}
                    ref={forwardedRef}
                    className="DropdownMenuItem"
                    onSelect={(event) => {
                        event.preventDefault();
                    }}
                >
                    Remove
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently delete this task ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" onClick={handleClick}>
                        {isRemoving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});
RemoveTaskMenuItem.displayName = "RemoveTaskMenuItem";
