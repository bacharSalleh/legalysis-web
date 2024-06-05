import { db } from "@/lib/db";
import { ratelimiter } from "@/lib/ratelimit";
import { joinWaitlistSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
    const { success } = await ratelimiter.limit(`${req.ip}__join_waitlist`);
    if (!success) {
        return new Response(undefined, { status: 429 });
    }

    const data = await req.json();

    try {
        const { email } = joinWaitlistSchema.parse(data);

        try {
            const found = await db.waitlistLegalysis.findFirst({
                where: {
                    email,
                },
            });

            if (found) {
                return NextResponse.json({ message: "You are already in our waitlist" }, { status: 400 });
            }

            const created = await db.waitlistLegalysis.create({
                data: { email },
            });

            return new Response(undefined, { status: 200 });
        } catch (error) {
            console.error(`API: /tasks POST - email: ${email} \n ${error}`);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    } catch (error) {
        console.error(`API: /wait-list POST  \n ${error}`);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }

        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
