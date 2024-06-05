import { fileConfig } from "@/config/file";
import { FileType } from "@prisma/client";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mimeToType(mime?: string): FileType {
    if (!mime) {
        throw new Error("Mime type cann't be null");
    }
    if (mime in fileConfig.mimeTypeMap) {
        return fileConfig.mimeTypeMap[mime as keyof typeof fileConfig.mimeTypeMap];
    } else {
        return "OTHER";
    }
}

export function displayErrorReason(reason: string) {
    if (reason.startsWith("Unsupported mime type")) {
        return "Unsupported file type";
    }

    if (reason.startsWith("No text in file. Ensure it's not image or empty.")) {
        return reason;
    }

    if (reason.startsWith("Not Enough Credit. Required:")) {
        return reason;
    }

    return "Unknown reason";
}

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function firstLetterCapital(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
