import { MonthlyPricingCard } from "@/components/PriceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PACK_NAMES } from "@/config/payment";
import { stripe } from "@/lib/stripe";
import { getPackFrom } from "@/lib/payment";
import { absoluteUrl } from "@/lib/utils";
import { PackDetails, PackValues } from "@/types";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

interface PageProps {
    searchParams: {
        plan?: PackValues;
    };
}

const balanceUrl = absoluteUrl("/dashboard/#balance");

export default async function IndexPage({ searchParams }: PageProps) {
    const plan = searchParams.plan;
    const user = await getCurrentUser();

    if (plan && user) {
        const requestedPack: PackDetails | null = getPackFrom(plan);

        if (!user || !user?.email || !requestedPack) {
            return redirect("/", RedirectType.replace);
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: balanceUrl,
            cancel_url: balanceUrl,
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: "auto",
            customer_email: user.email,
            line_items: [
                {
                    price: requestedPack?.stripePriceId, // You will need to set up prices for your credit packs in Stripe
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
            },
        });

        return redirect(stripeSession.url ?? "/", RedirectType.replace);
    }

    if (plan && !user) {
        let from = `/pricing?plan=${plan}`;
        return redirect(`/login?from=${encodeURIComponent(from)}`);
    }

    return (
        <section id="pricing" className="container space-y-6 py-8  md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Pricing for Credit Packs
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Purchase credit packs and only pay for what you use!
                </p>
            </div>

            <Tabs defaultValue="packages" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid grid-cols-1">
                        <TabsTrigger value="packages">Credit Packs</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="packages">
                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-3">
                        <MonthlyPricingCard
                            title="Free Pack"
                            packName={PACK_NAMES.FREE}
                            price="0"
                            freePack={true}
                            userId={user?.id ?? null}
                        >
                            <ul className=" text-muted-foreground mt-8 space-y-3 list-disc ">
                                <li>
                                    <b className="text-foreground">7</b> credits - A welcoming gift for newcomers to
                                    start exploring our service!
                                </li>
                                <li>
                                    Processes approximately <b className="text-foreground">4</b> pages.
                                </li>
                            </ul>
                        </MonthlyPricingCard>
                        <MonthlyPricingCard
                            title="Starter Pack"
                            packName={PACK_NAMES.STARTER_PACK}
                            price="10"
                            userId={user?.id ?? null}
                        >
                            <ul className=" text-muted-foreground mt-8 space-y-3 list-disc ">
                                <li>
                                    <b className="text-foreground">35</b> credits - Perfect for new users who want to
                                    try out our service!
                                </li>
                                <li>
                                    Processes approximately <b className="text-foreground">40</b> pages.
                                </li>
                            </ul>
                        </MonthlyPricingCard>
                        <MonthlyPricingCard
                            title="Value Pack"
                            packName={PACK_NAMES.VALUE_PACK}
                            price="50"
                            userId={user?.id ?? null}
                        >
                            <ul className=" text-muted-foreground mt-8 space-y-3 list-disc ">
                                <li>
                                    <b className="text-foreground">180</b> credits - Great value for money, suitable for
                                    users looking to get more out of our service!
                                </li>
                                <li>
                                    Processes approximately <b className="text-foreground">210</b> pages.
                                </li>
                            </ul>
                        </MonthlyPricingCard>
                        <MonthlyPricingCard
                            title="Pro Pack"
                            packName={PACK_NAMES.PRO_PACK}
                            price="100"
                            userId={user?.id ?? null}
                        >
                            <ul className=" text-muted-foreground mt-8 space-y-3 list-disc ">
                                <li>
                                    <b className="text-foreground">375</b> credits - Our best value package, ideal for
                                    power users who will be using our service heavily!
                                </li>
                                <li>
                                    Processes approximately <b className="text-foreground">450</b> pages.
                                </li>
                            </ul>
                        </MonthlyPricingCard>

                        <MonthlyPricingCard
                            title="Enterprise Pack"
                            packName={PACK_NAMES.ENTERPRISE_PACK}
                            price=""
                            userId={user?.id ?? null}
                            contactSales
                        >
                            <ul className="text-muted-foreground mt-8 space-y-3 list-disc ">
                                <li>
                                    <b className="text-foreground">Unlimited</b> credits - Experience the ultimate
                                    freedom with no limits on usage.
                                </li>
                                <li>
                                    <b className="text-foreground">Faster Processing</b> - Benefit from priority
                                    processing to ensure your tasks are completed even quicker.
                                </li>
                                <li>
                                    <b className="text-foreground">Dedicated Support</b> - Get premium, personalized
                                    support whenever you need it.
                                </li>
                                <li>
                                    The Enterprise Pack is specifically tailored for large-scale businesses that demand
                                    the best. With this package, you&lsquo;ll be able to take full advantage of our
                                    services without restrictions, backed by our unwavering support and commitment to
                                    your success.
                                </li>
                            </ul>
                        </MonthlyPricingCard>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
