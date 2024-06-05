import { fileConfig } from "@/config/file";
import z from "zod";

export const createTaskSchema = z.object({
    name: z
        .string()
        .max(255, "The name must be no more than 250 characters long")
        .nonempty({ message: "Please enter a name" }),
    taskType: z.string().nonempty({ message: "Please select a task type" }),
    file: z
        .object({
            name: z.string().nonempty({ message: "Please select a file" }),
            size: z.number().max(fileConfig.maxSize, "File size must be 5MB or less"), // size in bytes
            mime: z.string().refine((val) => fileConfig.mimes.has(val), "File must be a PDF or DOCX"),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Please select a file",
        }),
});

export const joinWaitlistSchema = z.object({
    email: z.string().email().nonempty({ message: "Please enter an email" }),
});
