import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { credits, apiKey } = await db.user.findFirstOrThrow({ where: { id: user.id } });

    return NextResponse.json({ data: { credits, apiKey } }, { status: 200 });
}
