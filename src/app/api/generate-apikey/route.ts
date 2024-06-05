import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const key = crypto.randomBytes(32);
    const apiKey = key.toString("base64");

    await db.user.update({
        where: { id: user.id },
        data: {
            apiKey,
        },
    });

    return NextResponse.json({ data: apiKey }, { status: 200 });
}
