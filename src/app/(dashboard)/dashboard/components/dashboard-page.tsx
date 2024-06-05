"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { TaskCreateButton } from "@/components/task-create-button";
import { TaskCreateForm } from "@/components/task-create-form";
import { TasksTable } from "@/components/tasks-table/tasks-table";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2, TypographyLarge, TypographyP, TypographySmall } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    CodeExampleDeleteTaskById,
    CodeExampleGetTaskById,
    CodeExampleGetTasks,
    CodeExamplePostTask,
} from "./code-docs";
import DashboardShell from "./dashboard-shell";
import { GenerateApiKeyDialog } from "./generate-api-key-dialog";

interface DashboardPageClientProps {
    user: User & {
        id: string;
    };
}

const DashboardPageClient = ({ user }: DashboardPageClientProps) => {
    const { data: tasksData } = useQuery("tasks", () => getTasksForUser(user.id));
    const {
        data: meData,
        refetch: refetchMetaData,
        isFetching: isFetchingMetaData,
    } = useQuery("credits", () => getUserInfo(user.id));
    const tasks: any = tasksData?.data ?? [];
    const accountMeta = meData?.data ?? undefined;
    const credits = accountMeta?.credits || 0;
    const apiKey = accountMeta?.apiKey;
    const searchParams = useSearchParams();

    useEffect(() => {
        const tabQueryParam = searchParams?.get("tab");

        if (tabQueryParam && ["createTask", "tasks", "api"].includes(tabQueryParam)) {
            setCurrentTab(tabQueryParam as string);
        }
    }, [searchParams]);

    const [currentTab, setCurrentTab] = useState("tasks");

    const onCreateTaskClick = () => {
        setCurrentTab("createTask");
        setTimeout(() => document.getElementById("task-name")?.focus(), 100);
    };

    const onTabClick = (newTab: string) => {
        setCurrentTab(newTab);
    };

    return (
        <DashboardShell>
            <Card id="balance" className="bg-foreground text-background">
                <CardHeader className="grid grid-cols-1 md:grid-cols-2 items-baseline space-y-0">
                    <div>
                        <TypographyLarge className="inline-block text-lg md:text-xl">BALANCE:</TypographyLarge>{" "}
                        <TypographyH2 className="inline-block text-2xl md:text-3xl ml-4 mr-0 mt-0 border-none p-0">
                            {credits}
                        </TypographyH2>{" "}
                        {credits < 2 ? (
                            <TypographySmall>credit</TypographySmall>
                        ) : (
                            <TypographySmall>credits</TypographySmall>
                        )}
                    </div>

                    <div className="h-5 md:hidden"></div>
                    <div className="flex-1 flex flex-row-reverse">
                        <Link
                            href={"/pricing"}
                            className={cn(buttonVariants({ variant: "secondary" }), "w-full md:w-auto")}
                        >
                            Buy Credits
                        </Link>
                    </div>
                </CardHeader>
            </Card>
            <div>
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                    ☝️{" "}
                    <div data-orientation="vertical" role="none" className="shrink-0 bg-border w-[1px] mx-2 h-4"></div>
                    <span>
                        Each <b>1 credit</b> allows you to process approximately 1 full page of text.
                    </span>
                </div>
                <div className="h-8"></div>
            </div>

            <DashboardHeader heading="Tasks" text="Create and manage tasks.">
                <TaskCreateButton onClick={onCreateTaskClick} />
            </DashboardHeader>

            <Tabs value={currentTab} className="space-y-4" onValueChange={(v) => onTabClick(v)}>
                <TabsList>
                    <TabsTrigger value="createTask">Create task</TabsTrigger>
                    <TabsTrigger value="tasks">Your Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="space-y-4 block max-w-full">
                    <TasksTable data={tasks} />
                </TabsContent>
                <TabsContent value="createTask" className="space-y-4">
                    <TaskCreateForm className="animate-in fade-in-10 duration-300" id="create-task-form" />
                </TabsContent>
            </Tabs>

            <TypographyP>
                If you have any question, please contact us at{" "}
                <Link
                    href="mailto:support@legalysis.co"
                    target="_blank"
                    className="underline underline-offset-4 font-bold"
                >
                    Support
                </Link>
                .
            </TypographyP>
        </DashboardShell>
    );
};

export default DashboardPageClient;

const getTasksForUser = async (userId: string) => {
    try {
        const res = await fetch("/api/tasks", {
            method: "GET",
        });

        if (!res?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again.",
                variant: "destructive",
            });
        }

        return await res.json();
    } catch (err) {
        return toast({
            title: "Something went wrong.",
            description: "Sorry for that. Please try again or Call support",
            variant: "destructive",
        });
    } finally {
    }
};

const getUserInfo = async (userId: string) => {
    try {
        const res = await fetch("/api/user/me", {
            method: "GET",
        });

        if (!res?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Sorry for that. Please try again.",
                variant: "destructive",
            });
        }

        return await res.json();
    } catch (err) {
        return toast({
            title: "Something went wrong.",
            description: "Sorry for that. Please try again or Call support",
            variant: "destructive",
        });
    } finally {
    }
};

const TabAPI = ({ apiKey }: any) => {
    const onCopyApiKeyClick = async () => {
        await navigator.clipboard.writeText(apiKey);
        setCopied(true);
    };

    const [copied, setCopied] = useState(false);

    const onRegenerateAPIKeyClick = (apiKey: string) => {
        // refetchMetaData();
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 1000); // Change to the desired number of seconds
            return () => clearTimeout(timer);
        }
    }, [copied]);
    return (
        <TabsContent value="api" className="space-y-4">
            <div className="h-12"></div>
            <div className="flex justify-between items-center bg-foreground text-background p-3 py-4 rounded-lg">
                <div>
                    <TypographyLarge className="inline-block">API Key:</TypographyLarge>{" "}
                    <TypographyH2 className="inline-flex items-center text-sm md:text-base ml-4 mr-0 mt-0 border-none p-0">
                        <TypographyH2 className="inline-block text-sm md:text-base ml-4 mr-0 mt-0 border-none p-0">
                            <code>
                                {apiKey ? (
                                    `${apiKey?.substring(0, 15)}************`
                                ) : (
                                    <div className="flex items-center">
                                        API Key not found. Click <Icons.generate className="mx-2 h-4 w-4" /> to create a
                                        new one.
                                    </div>
                                )}
                            </code>
                        </TypographyH2>
                    </TypographyH2>
                </div>
                <div className="flex space-x-2">
                    {apiKey && (
                        <button
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-full md:w-auto",
                                copied ? "animate-pulse" : ""
                            )}
                            onClick={onCopyApiKeyClick}
                        >
                            {copied ? "Copied!" : <Icons.copy className="h-4 w-4" />}
                        </button>
                    )}
                    <GenerateApiKeyDialog onRegenerateAPIKeyClick={onRegenerateAPIKeyClick} />
                </div>
            </div>
            <div className="h-8"></div>

            <div className="flex flex-col space-y-2">
                <TypographyLarge className="block text-lg md:text-xl">How to use the API:</TypographyLarge>

                <TypographySmall className="block text-muted-foreground">
                    Here's a simple example of how to make a request to our API using Node.js:
                </TypographySmall>
            </div>

            <CodeExampleGetTasks />
            <SelectSeparator />
            <CodeExampleGetTaskById />
            <SelectSeparator />
            <CodeExamplePostTask />
            <SelectSeparator />
            <CodeExampleDeleteTaskById />
        </TabsContent>
    );
};
