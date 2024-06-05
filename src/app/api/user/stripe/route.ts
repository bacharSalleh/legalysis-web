import { stripe } from "@/lib/stripe";
import { getPackFrom } from "@/lib/payment";
import { absoluteUrl } from "@/lib/utils";
import { PackDetails } from "@/types";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

const balanceUrl = absoluteUrl("/dashboard/#balance");

export async function GET(req: NextRequest) {
    try {
        const plan = req.nextUrl.searchParams.get("plan");

        const requestedPack: PackDetails | null = getPackFrom(plan);

        const user = await getCurrentUser();

        if (!user || !user?.email || !requestedPack) {
            return new Response(null, { status: 403 });
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

        return new Response(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.error(`API: /user/stripe - req: ${req.nextUrl.searchParams} \n ${error}`);
        return new Response(null, { status: 500 });
    }
}
