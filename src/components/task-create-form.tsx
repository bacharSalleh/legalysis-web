"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { dashboardConfig } from "@/config/dashboard";
import { fileConfig } from "@/config/file";
import { cn } from "@/lib/utils";
import { createTaskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "./ui/use-toast";

interface TaskCreateFormProps extends React.HTMLAttributes<HTMLFormElement> {}
type FormData = z.infer<typeof createTaskSchema>;

async function uploadFile(file: File, url: string, fields: Record<string, string>) {
    // Create a new FormData instance
    const formData = new FormData();

    // Append the fields from the pre-signed POST data
    Object.keys(fields).forEach((key) => formData.append(key, fields[key]));

    // Append the file to the form data
    formData.append("file", file);

    // Upload the file to DigitalOcean Spaces
    const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
    });

    // Check if upload was successful
    if (!uploadResponse.ok) {
        throw new Error("File upload failed");
    }

    // Return the public URL of the uploaded file
    // This assumes that the URL is formed by combining the bucket URL and the file name

    return `${url}/${encodeURIComponent(file.name)}`;
}

export function TaskCreateForm({ className, ...props }: TaskCreateFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        control,
    } = useForm<FormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            taskType: "summarize",
        },
    });

    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (!fileToUpload) {
            return setValue("file", null);
        }
        setValue("file", {
            name: fileToUpload.name,
            mime: fileToUpload.type,
            size: fileToUpload.size,
        });
    }, [fileToUpload, setValue]);

    async function onSubmit(data: FormData) {
        setIsSaving(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            });

            if (!res?.ok) {
                return toast({
                    title: "Something went wrong.",
                    description: "Sorry for that. Please try again.",
                    variant: "destructive",
                });
            }

            if (!fileToUpload) {
                return toast({
                    title: "Something went wrong.",
                    description: "Sorry for that. Your file is corrupted. Please try again.",
                    variant: "destructive",
                });
            }

            const { url, fields } = await res.json();

            try {
                await uploadFile(fileToUpload, url, fields);
                toast({
                    title: "New Task created successfully.",
                    description: `${data.name} is created.`,
                    variant: "success",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error: any) {
                return toast({
                    title: "Something went wrong.",
                    description: error.message,
                    variant: "destructive",
                });
            }
        } catch (err) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again or Call support",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
            reset();
            setFileToUpload(null);
            router.refresh();
        }
    }

    return (
        <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create New Task</CardTitle>
                    <CardDescription>
                        Please enter your task name and upload a PDF or DOCX file to be processed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="task-name">Task Name</Label>
                                <Input
                                    id="task-name"
                                    className="w-full md:w-full"
                                    size={32}
                                    {...register("name")}
                                    disabled={isSaving}
                                />
                                {errors?.name && <p className="px-1 text-xs text-red-600">{errors.name.message}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="taskType">Task Type</Label>
                                <TaskSelect defaultValue="summarize" onChange={(v) => setValue("taskType", v)} />
                                {errors?.taskType && (
                                    <p className="px-1 text-xs text-red-600">{errors.taskType.message}</p>
                                )}
                            </div>
                        </div>
                        <FileUploadZone
                            formError={errors.file?.message}
                            fileToUpload={fileToUpload}
                            setFileToUpload={setFileToUpload}
                            disabled={isSaving}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <button
                        type="submit"
                        className={cn(buttonVariants(), className, "w-full md:w-auto")}
                        disabled={isSaving} // Change this to the cost of uploading a task if it's not 1
                    >
                        {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        <span>Create Task</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    );
}

function FileUploadZone({
    formError,
    setFileToUpload,
    fileToUpload,
    disabled,
}: {
    formError?: string;
    setFileToUpload: (file: File | null) => void;
    fileToUpload: File | null;
    disabled: boolean;
}) {
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (formError) {
            setError(formError);
        }
    }, [formError]);

    const onDrop = React.useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            setFileToUpload(file);
            setError(null);
        },
        [setFileToUpload, setError]
    );

    const onDropRejected = React.useCallback((fileRejections: FileRejection[], event: DropEvent) => {
        if (fileRejections.length == 0) return;

        const file = fileRejections[0].file;
        if (fileConfig.mimes.has(file.type)) {
            if (file.size > fileConfig.maxSize) {
                // check if file size is larger than 5MB
                setError("File size exceeds 5MB");
            }
        } else {
            setError("Only PDF or DOCX is allowed");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        maxSize: fileConfig.maxSize,
        minSize: 100,
        onDropRejected,
        disabled,
    });

    const removeFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setFileToUpload(null);
    };

    return (
        <div
            {...getRootProps({
                onClick: (e) => {
                    if (fileToUpload) {
                        setFileToUpload(null);
                    }
                },
            })}
            className={cn(
                "rounded-md w-full h-52 border-2 relative border-dashed p-8 text-center animate-in fade-in-50 flex items-center justify-center  cursor-pointer hover:bg-muted/50 transition-colors",
                isDragActive && "bg-muted/50"
            )}
        >
            <input {...getInputProps()} />
            {fileToUpload && (
                <div className="">
                    <div className="flex flex-col gap-4  items-center justify-center">
                        <Icons.post className="w-14 h-14" />
                        <Icons.close className="w-5 h-5 absolute top-5 ml-14" onClick={removeFile} />
                        <TypographyMuted className="flex">{fileToUpload.name}</TypographyMuted>
                    </div>
                </div>
            )}
            {!fileToUpload && isDragActive && <p>Drop the files here...</p>}
            {!fileToUpload && !isDragActive && (
                <div className="flex flex-col gap-4 items-center justify-center">
                    <Icons.post className="w-14 h-14" />
                    <TypographyMuted className="hidden md:flex">
                        Drag and drop some file here, or click to select file
                    </TypographyMuted>
                    <TypographyMuted className="flex md:hidden">Click to select file</TypographyMuted>
                    <TypographySmall>Only PDF or DOCX</TypographySmall>
                    {error && <TypographySmall className="text-red-600">{error}</TypographySmall>}
                </div>
            )}
        </div>
    );
}

function TaskSelect({ defaultValue, onChange }: { defaultValue: string; onChange: (v: string) => void }) {
    return (
        <Select defaultValue={defaultValue} onValueChange={onChange}>
            <SelectTrigger className="w-full md:w-full">
                <SelectValue placeholder="Select a Task Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {dashboardConfig.taskType.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                            {item.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
