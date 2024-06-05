import { GetStartedHomeButton } from "@/components/get-started-home-btn";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function IndexPage() {
    return (
        <>
            <section className="space-y-2 pt-12 md:pt-20 border-b border-input">
                <div className="container grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="flex-col flex md:gap-6 gap-3 justify-center pb-6">
                        <div className="grid grid-cols-1 md:gap-4 gap-2 items-center">
                            <span className="md:text-6xl text-3xl">A Powerful Tool for</span>
                            <span>
                                <strong className="text-4xl md:text-7xl">Analyzing</strong>
                                <span className="text-4xl md:text-7xl"> &</span>{" "}
                                <strong className="text-4xl md:text-7xl">Summarizing</strong>
                            </span>
                            <span className="md:text-6xl text-3xl"> Legal Documents</span>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Our tool is designed to save your time and reduce complexity in legal processes. Whether
                            you're a law firm, a corporate legal department, or an individual dealing with legal
                            documents, our solution is built for you.
                        </p>

                        <div className="text-left">
                            <GetStartedHomeButton />
                        </div>
                    </div>

                    <div className="flex relative min-h-[14rem] md:min-h-[32rem]">
                        <Image
                            src={"/lady_justice.png"}
                            alt="lady_justice"
                            className="bottom-0 absolute left-0 object-contain w-full max-h-full"
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </div>
                </div>
            </section>

            <section id="services" className="space-y-6 py-8 md:py-12 lg:py-24  border-b border-input">
                <div className="container flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                        We Provide You Two Main Services
                    </h2>
                    <p className="max-w-[85%] leading-normal  text-muted-foreground sm:text-lg sm:leading-7">
                        We offer modern solutions for legal analysis. You can go through contracts, spot potential
                        issues, and simplify dense legal documents into easy-to-read summaries.
                    </p>
                </div>

                <div className="container grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex flex-col items-center justify-between rounded-md p-6 gap-y-4">
                            <div className="h-36 w-48 gap-3 flex flex-col items-center relative">
                                <Image
                                    src={"/spot1.png"}
                                    alt="spot-1"
                                    className="bottom-0 absolute left-0 object-contain w-full max-h-full"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                                <Icons.analyzation className="bottom-0" />
                                <strong className="text-lg">Document Analysis</strong>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground text-center leading-7">
                                    Leverage the power of our advanced AI technology that examines contracts and other
                                    legal documents in depth. It detects potential risks and issues with impressive
                                    accuracy, ensuring you're aware of any pitfalls before you proceed.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex flex-col items-center justify-between rounded-md p-6 gap-y-4">
                            <div className="h-36 w-64 gap-3 flex flex-col items-center relative">
                                <Image
                                    src={"/spot2.png"}
                                    alt="spot-2"
                                    className="bottom-0 absolute left-0 object-contain w-full max-h-full"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                                <Icons.summarization className="bottom-0" />
                                <strong className="text-lg">Document Summarization</strong>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground text-center leading-7">
                                    Benefit from our robust LLM (Legal Language Model) that converts dense, lengthy
                                    legal documents into brief, one-page summaries. This model retains all crucial
                                    information and transforms it into a simpler format, providing you a swift and
                                    thorough overview of the document at a glance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="usecases" className="relative space-y-6 py-8 md:py-12 lg:py-24  border-b border-input">
                <div className="container flex items-center justify-center">
                    <div className="flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                            Why To Use Our Product ?
                        </h2>
                    </div>
                    <div className="flex relative w-40 h-24">
                        <Image
                            src={"/gaval.png"}
                            alt="gaval"
                            className="bottom-0 top-0 absolute left-0 object-contain w-full max-h-full"
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </div>
                </div>

                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                    <div className="flex flex-col gap-2 p-4 rounded bg-foreground/10">
                        <h1 className="text-left font-bold text-lg">
                            Contract Risk Analysis - Uncovering Hidden Pitfalls
                        </h1>
                        <p className="text-muted-foreground">
                            When you're presented with a legal contract, it's essential to conduct a thorough risk
                            analysis to ensure there are no potential hazards hidden between the lines. Leglaysis excels
                            at this by utilizing its advanced AI technology to meticulously examine the contract's
                            content. It goes beyond simple keyword scanning and delves deep into the legal language,
                            identifying nuanced clauses and potential liabilities that might be easily overlooked by
                            human eyes. With this comprehensive risk analysis, you can make informed decisions,
                            negotiate better terms, and safeguard your interests before proceeding with the contract.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded bg-foreground/10">
                        <h1 className="text-left font-bold text-lg">
                            Transparent Understanding - Know What You're Signing
                        </h1>
                        <p className="text-muted-foreground">
                            Signing a legal document without a clear understanding of its contents can lead to serious
                            consequences. Leglaysis provides you with the clarity you need. Our AI-powered tool dissects
                            complex legalese and converts it into clear and comprehensible language. This makes it
                            easier for individuals, not just legal professionals, to grasp the implications of the
                            document. By having a transparent understanding of what you're signing, you can confidently
                            enter agreements, knowing that you are fully aware of your rights and obligations.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded bg-foreground/10">
                        <h1 className="text-left font-bold text-lg">
                            Cross-Country Risk Pointing - Navigating Legal Differences
                        </h1>
                        <p className="text-muted-foreground">
                            Navigating legal systems across different countries can be daunting, as laws vary
                            significantly. Leglaysis addresses this concern by pinpointing potential risks in legal
                            documents based on the country of origin's laws. Its AI model is trained to recognize
                            jurisdiction-specific regulations, enabling it to highlight any inconsistencies or
                            non-compliance that may arise due to these differences. Whether you're dealing with
                            international contracts or legal matters spanning multiple jurisdictions, Leglaysis ensures
                            you're aware of the potential challenges and compliance issues relevant to each country
                            involved.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded bg-foreground/10">
                        <h1 className="text-left font-bold text-lg">
                            Document Summarization - Condensing Large Documents with Precision
                        </h1>
                        <p className="text-muted-foreground">
                            Long, intricate legal documents can be overwhelming and time-consuming to read through in
                            their entirety. Leglaysis streamlines this process by offering a concise summarization
                            service. Leveraging the power of our LLM (Legal Language Model), the tool extracts the key
                            points, critical details, and significant implications from the lengthy document. The result
                            is a well-structured, one-page summary that retains all essential information, providing you
                            with a swift and comprehensive overview of the document's content. This summarization
                            feature saves you valuable time while ensuring you don't miss any critical insights buried
                            in the extensive text.
                        </p>
                    </div>
                </div>
            </section>

            <section id="packages" className="container py-8 md:py-12 lg:py-24">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Flexible Credit Packages
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        We offer different credit packages to suit your needs. Choose the amount of credits you need and
                        buy more anytime. Use the service at your own pace and get extra features with each package.
                    </p>
                    <div className="space-x-4">
                        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
                            Try For Free
                        </Link>
                        <Link href="/pricing" className={cn(buttonVariants({ size: "lg" }))}>
                            Buy Credits
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
