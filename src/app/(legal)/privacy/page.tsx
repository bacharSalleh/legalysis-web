import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function IndexPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={[]} />
                    {/* <ModeToggle /> */}
                </div>
            </header>
            <main className="mx-auto max-w-[64rem] p-4">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Privacy Policy</h2>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-background p-2">
                    <div className="rounded-md p-6 space-y-4">
                        <div className="space-y-0">
                            <div className="py-3">
                                <p className="text-sm text-muted-foreground">
                                    Your privacy is important to us. This Privacy Policy explains how we collect, use,
                                    and protect your information when you use our Services.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Information We Collect</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We collect information you provide directly to us, such as when you create an
                                    account, upload a document for analysis, or communicate with us. This information
                                    includes your name, email address, and the results of our analysis.
                                </p>
                            </div>{" "}
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Use of Information</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We use the information we collect to provide, maintain, and improve our Services,
                                    such as to administer your account and to provide you with insights and analysis
                                    based on your documents.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Security</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We employ security measures to protect your information from access by unauthorized
                                    persons and against unlawful processing, accidental loss, destruction, and damage.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Data Retention</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We only retain the results of our analysis of your documents. We do not retain the
                                    original documents you upload. If you delete a task, the associated results are
                                    permanently deleted from our systems.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Changes to this Policy</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We may change this Privacy Policy from time to time. If we make changes, we will
                                    notify you by revising the date at the top of the policy and, in some cases, we may
                                    provide you with additional notice (such as adding a statement to our homepage or
                                    sending you an email notification).
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1 text-sm">Contact Us</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    If you have any questions about this Privacy Policy, please contact us at{" "}
                                    <Link
                                        href="mailto:support@legalysis.co"
                                        target="_blank"
                                        className="underline underline-offset-4 font-bold"
                                    >
                                        Support
                                    </Link>
                                    .
                                </p>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
