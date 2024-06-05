import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getPackCreditFromPriceId } from "@/lib/payment";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (process.env.NODE_ENV != "production") {
        console.info("EVENT TYPE:", event.type);
    }

    if (event.type === "checkout.session.completed") {
        // Retrieve the checkout session details from Stripe.
        const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ["line_items"],
        });

        // Get the number of credits bought by the user based on the price id.
        const creditsBought = getPackCreditFromPriceId(checkoutSession.line_items?.data[0]?.price?.id);

        // Fetch the user from your database.
        const user = await db.user.findFirst({
            where: {
                id: session?.metadata?.userId,
            },
            select: {
                // Assuming you have a 'credits' field in your database.
                credits: true,
            },
        });

        if (!user || !session?.metadata?.userId) {
            console.error(
                `No User or session user id is wrong - session.metadata.userId: ${session?.metadata?.userId}`
            );
            return new Response(JSON.stringify({ message: `no user with id ${session?.metadata?.userId}` }), {
                status: 400,
            });
        }
        // Update the user's credit balance in your database.
        await db.user.update({
            where: {
                id: session?.metadata?.userId,
            },
            data: {
                credits: user?.credits + creditsBought,
            },
        });
    }

    return new Response(null, { status: 200 });
}
