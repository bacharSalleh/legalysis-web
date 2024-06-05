import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export const TypographyH1 = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
            {children}
        </h1>
    );
};

export const TypographyH2 = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
};

export const TypographyH3 = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
            {children}
        </h3>
    );
};

export const TypographyH4 = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
            {children}
        </h4>
    );
};

export const TypographyP = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>
            {children}
        </p>
    );
};

export const TypographyBlockquote = ({ children }: React.PropsWithChildren) => {
    return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>;
};
export const TypographyInlineCode = ({ children }: React.PropsWithChildren) => {
    return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
        </code>
    );
};

export const TypographyLead = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn("text-xl text-muted-foreground", className)} {...props}>
            {children}
        </p>
    );
};

export const TypographyLarge = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("text-lg font-semibold", className)} {...props}>
            {children}
        </div>
    );
};

export const TypographySmall = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLElement>) => {
    return (
        <small className={cn("text-sm font-medium leading-none", className)} {...props}>
            {children}
        </small>
    );
};

export const TypographyMuted = ({
    children,
    className,
    ...props
}: React.PropsWithChildren & HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn("text-sm text-muted-foreground", className)} {...props}>
            {children}
        </p>
    );
};
