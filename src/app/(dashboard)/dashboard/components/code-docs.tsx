"use client";

import { Icons } from "@/components/icons";
import {
    TypographyH3,
    TypographyInlineCode,
    TypographyLarge,
    TypographyP,
    TypographySmall,
} from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeExamplePostTask = () => {
    const code = `    {
        "name": "some_name",
        "taskType": "analysis",  // analysis, summarize
        "fileURL": "https://url_for_document.pdf_or_docx" // only DOCX or PDF
    }
`;
    const endPointCode = `https://legalysis.co/tasks?id=task_id `;

    const [isCopied, setIsCopied] = useState(false);
    const onCopyCodeClick = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const [isEndpointCopied, setIsEndpointCopied] = useState(false);
    const onCopyEndpointCodeClick = async () => {
        await navigator.clipboard.writeText(endPointCode);
        setIsEndpointCopied(true);
    };

    useEffect(() => {
        if (isEndpointCopied) {
            const timer = setTimeout(() => setIsEndpointCopied(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isEndpointCopied]);

    return (
        <div className="flex flex-col space-y-1 py-12">
            <TypographyLarge>POST /tasks</TypographyLarge>
            <TypographyP className="text-sm text-muted-foreground">create task</TypographyP>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                <li>
                    <TypographyInlineCode>https://api.legalysis.co</TypographyInlineCode>
                </li>
                <li>
                    <TypographyInlineCode>api-key</TypographyInlineCode> header is required
                </li>
            </ul>
            <div className="h-8"></div>
            <div className="relative">
                <TypographySmall>Endpoint:</TypographySmall>
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {endPointCode}
                </SyntaxHighlighter>
                <button
                    onClick={onCopyEndpointCodeClick}
                    className={`absolute bottom-3 right-2 p-2 ${isEndpointCopied ? "animate-pulse" : ""}`}
                >
                    <div className="flex flex-col items-center space-y-2" style={{ width: "50px" }}>
                        {isEndpointCopied ? (
                            <>
                                {/* <Icons.copyCheck className="h-5 w-5 " /> */}
                                <TypographySmall>Copied!</TypographySmall>
                            </>
                        ) : (
                            <Icons.copy className="h-5 w-5 " />
                        )}
                    </div>
                </button>
            </div>
            <div className="relative">
                <TypographySmall>Payload:</TypographySmall>
                <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {code}
                </SyntaxHighlighter>
                <button
                    onClick={onCopyCodeClick}
                    className={`absolute top-8 right-2 p-2 ${isCopied ? "animate-pulse" : ""}`}
                >
                    <div className="flex flex-col items-center space-y-2" style={{ width: "50px" }}>
                        {isCopied ? (
                            <>
                                {/* <Icons.copyCheck className="h-5 w-5 " /> */}
                                <TypographySmall>Copied!</TypographySmall>
                            </>
                        ) : (
                            <Icons.copy className="h-5 w-5 " />
                        )}
                    </div>
                </button>
            </div>
            <div className="relative">
                <TypographySmall>Response:</TypographySmall>
                <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {`
    {
        "taskId": "task_id"
    }
        `}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export const CodeExampleGetTaskById = () => {
    const code = `https://legalysis.co/tasks?id=task_id `;

    const [isCopied, setIsCopied] = useState(false);
    const onCopyCodeClick = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <div className="flex flex-col space-y-1 py-12">
            <TypographyLarge>GET /tasks?id=</TypographyLarge>
            <TypographyP className="text-sm text-muted-foreground">get task</TypographyP>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                <li>
                    <TypographyInlineCode>https://api.legalysis.co</TypographyInlineCode>
                </li>
                <li>
                    <TypographyInlineCode>id</TypographyInlineCode> is required.
                </li>

                <li>
                    <TypographyInlineCode>api-key</TypographyInlineCode> header is required
                </li>
            </ul>
            <div className="h-8"></div>
            <div className="relative">
                <TypographySmall>Endpoint:</TypographySmall>
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {code}
                </SyntaxHighlighter>
                <button
                    onClick={onCopyCodeClick}
                    className={`absolute bottom-3 right-2 p-2 ${isCopied ? "animate-pulse" : ""}`}
                >
                    <div className="flex flex-col items-center space-y-2" style={{ width: "50px" }}>
                        {isCopied ? (
                            <>
                                {/* <Icons.copyCheck className="h-5 w-5 " /> */}
                                <TypographySmall>Copied!</TypographySmall>
                            </>
                        ) : (
                            <Icons.copy className="h-5 w-5 " />
                        )}
                    </div>
                </button>
            </div>
            <div className="relative">
                <TypographySmall>Response:</TypographySmall>
                <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {`
     {
        "data": {
            "id": "id_of_the_task",
            "resultURL": "https://some_URL",  // this will be link to json file
            "taskType": "analysis", // analysis, summarize
            "name": "some_name",
            "status": "done", // done, to_process, failed, processing 
            "creditsConsume": 1,
            "failReason": null
        }
    }
        `}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export const CodeExampleGetTasks = () => {
    const code = `https://api.legalysis.co/tasks?page=5&size=20`;

    const [isCopied, setIsCopied] = useState(false);
    const onCopyCodeClick = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <div className="flex flex-col space-y-1 py-8">
            <TypographyLarge>GET /tasks?page=1&size=10</TypographyLarge>
            <TypographyP className="text-sm text-muted-foreground">get all tasks</TypographyP>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                <li>
                    <TypographyInlineCode>https://api.legalysis.co</TypographyInlineCode>
                </li>
                <li>
                    <TypographyInlineCode>page</TypographyInlineCode> is required.
                </li>
                <li>
                    <TypographyInlineCode>size</TypographyInlineCode> is required. max value is <b>100</b> and min value
                    is <b>1</b>
                </li>
                <li>
                    <TypographyInlineCode>api-key</TypographyInlineCode> header is required
                </li>
            </ul>
            <div className="h-8"></div>
            <div className="relative">
                <TypographySmall>Endpoint:</TypographySmall>
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {code}
                </SyntaxHighlighter>
                <button
                    onClick={onCopyCodeClick}
                    className={`absolute bottom-3 right-2 p-2 ${isCopied ? "animate-pulse" : ""}`}
                >
                    <div className="flex flex-col items-center space-y-2" style={{ width: "50px" }}>
                        {isCopied ? (
                            <>
                                {/* <Icons.copyCheck className="h-5 w-5 " /> */}
                                <TypographySmall>Copied!</TypographySmall>
                            </>
                        ) : (
                            <Icons.copy className="h-5 w-5 " />
                        )}
                    </div>
                </button>
            </div>

            <div className="relative">
                <TypographySmall>Response:</TypographySmall>
                <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {`
     {
        "data": [
            {
                "id": "id_of_the_task",
                "taskType": "analysis", // analysis, summarize
                "name": "some_name",
                "status": "done", // done, to_process, failed, processing
                "creditsConsume": 1,
                "failReason": null
            }
        ]
    }
        `}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export const CodeExampleDeleteTaskById = () => {
    const code = `https://legalysis.co/tasks?id=task_id `;

    const [isCopied, setIsCopied] = useState(false);
    const onCopyCodeClick = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <div className="flex flex-col space-y-1 py-12">
            <TypographyLarge>DELETE /tasks?id=</TypographyLarge>
            <TypographyP className="text-sm text-muted-foreground">delete task</TypographyP>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                <li>
                    <TypographyInlineCode>https://api.legalysis.co</TypographyInlineCode>
                </li>
                <li>
                    <TypographyInlineCode>id</TypographyInlineCode> is required.
                </li>

                <li>
                    <TypographyInlineCode>api-key</TypographyInlineCode> header is required
                </li>
            </ul>
            <div className="h-8"></div>
            <div className="relative">
                <TypographySmall>Endpoint:</TypographySmall>
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {code}
                </SyntaxHighlighter>
                <button
                    onClick={onCopyCodeClick}
                    className={`absolute bottom-3 right-2 p-2 ${isCopied ? "animate-pulse" : ""}`}
                >
                    <div className="flex flex-col items-center space-y-2" style={{ width: "50px" }}>
                        {isCopied ? (
                            <>
                                {/* <Icons.copyCheck className="h-5 w-5 " /> */}
                                <TypographySmall>Copied!</TypographySmall>
                            </>
                        ) : (
                            <Icons.copy className="h-5 w-5 " />
                        )}
                    </div>
                </button>
            </div>
            <div className="relative">
                <TypographySmall>Response:</TypographySmall>
                <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 300 }}
                >
                    {`Status Code 200`}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
