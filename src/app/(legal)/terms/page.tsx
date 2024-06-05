import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";
import { TypographyH4 } from "@/components/ui/typography";
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
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Terms Of Service</h2>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-background p-2">
                    <div className="rounded-md p-6 space-y-4">
                        <div className="space-y-0">
                            <div className="py-3">
                                <p className="text-sm text-muted-foreground">
                                    Welcome to our Legal Document Analysis and Summarization tool. Please read these
                                    Terms of Service (&ldquo;Terms&ldquo;) and our Privacy Policy carefully because they
                                    govern your use of our website located at [your website] and our services accessible
                                    via our website.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Agreement to Terms</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    By using our Services, you agree to be bound by these Terms. If you don’t agree to
                                    these Terms, do not use the Services.
                                </p>
                            </div>{" "}
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Privacy Policy</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    Please refer to our{" "}
                                    <Link href={"/privacy"} className="font-semibold underline underline-offset-4">
                                        Privacy Policy
                                    </Link>{" "}
                                    for information on how we collect, use, and disclose information from our users. You
                                    acknowledge and agree that your use of the Services is subject to our Privacy
                                    Policy.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Changes to Terms or Services</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    We may modify the Terms at any time, in our sole discretion. If we do so,
                                    we&lsquo;ll let you know either by posting the modified Terms on the Site or through
                                    other communications.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Using our Services</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    To use our Services, you must maintain your account. You are responsible for all
                                    activities that occur under your account, and you agree not to share your account or
                                    password with anyone.
                                </p>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1">Data Handling</TypographyH4>
                                <ul className="list-decimal list-inside text-sm text-muted-foreground">
                                    <li>
                                        We do not store any documents you upload for processing. We only store the
                                        results of our analysis and summarization.
                                    </li>
                                    <li>
                                        If you delete a task, the associated results will be permanently removed from
                                        our systems.
                                    </li>
                                </ul>
                            </div>
                            <div className="py-3">
                                <TypographyH4 className="mb-1 text-sm">Contact Us</TypographyH4>
                                <p className="text-sm text-muted-foreground">
                                    If you have any questions about this Terms of Service, please contact us at{" "}
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
