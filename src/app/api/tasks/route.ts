import { fileConfig } from "@/config/file";
import { db } from "@/lib/db";
import { ratelimiter } from "@/lib/ratelimit";
import { getCurrentUser } from "@/lib/session";
import { mimeToType } from "@/lib/utils";
import { createTaskSchema } from "@/lib/validation";
import { DeleteObjectCommand, S3 } from "@aws-sdk/client-s3";
import { PresignedPostOptions, createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { success } = await ratelimiter.limit(`${user.id}__create_task`);
    if (!success) {
        return new Response(undefined, { status: 429 });
    }

    const data = await req.json();

    const s3 = new S3({
        forcePathStyle: false,
        region: process.env.BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY!,
            secretAccessKey: process.env.SECRET_KEY!,
        },
    });

    try {
        const { file, name, taskType } = createTaskSchema.parse(data);
        const fileName = `${user.id}_${randomUUID()}.${mimeToType(file?.mime).toLowerCase()}`.trim();

        try {
            await db.file.create({
                data: {
                    status: "to_upload",
                    taskName: name,
                    taskType: taskType,
                    keyName: fileName,
                    path: `${process.env.BUCKET_UPLOAD_S3_URL}/${fileName}`,
                    userId: user.id,
                    fileType: mimeToType(file?.mime),
                },
            });

            const params: PresignedPostOptions = {
                Bucket: process.env.BUCKET_NAME!,
                Key: fileName,
                Expires: 60,
                Fields: {
                    acl: "private",
                },
                Conditions: [["content-length-range", fileConfig.minSize, fileConfig.maxSize]],
            };
            const { fields, url } = await createPresignedPost(s3, params);
            return NextResponse.json({ fields, url });
        } catch (error) {
            console.error(`API: /tasks POST - user: ${user.id} \n ${error}`);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    } catch (error) {
        console.error(`API: /tasks POST  \n ${error}`);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }

        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const taskId = req.nextUrl.searchParams.get("taskId") || null;

        if (!taskId) {
            return NextResponse.json({}, { status: 400 });
        }

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { success } = await ratelimiter.limit(`${user.id}__remove_task`);
        if (!success) {
            return new Response(undefined, { status: 429 });
        }

        const task = await db.file.findUniqueOrThrow({ where: { id: taskId } });

        if (!(task.status == "done" || task.status == "failed")) {
            return NextResponse.json({ error: "Can't remove task not processed yet" }, { status: 400 });
        }

        if (task.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const deletedFile = await db.file.delete({
            where: {
                id: task.id,
            },
        });

        if (!deletedFile) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }

        if (task.resultPath) {
            const s3 = new S3({
                forcePathStyle: false,
                region: process.env.BUCKET_REGION,
                credentials: {
                    accessKeyId: process.env.ACCESS_KEY!,
                    secretAccessKey: process.env.SECRET_KEY!,
                },
            });

            const command = new DeleteObjectCommand({
                Bucket: process.env.BUCKET_RESULT_NAME,
                Key: task.resultPath.split("/").slice(-1)[0],
            });

            const response = await s3.send(command);
            if (response.$metadata.httpStatusCode != 204) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
            }
        }

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(`API /api/tasks DELETE -- \n ${error}`);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const tasks = (
        await db.file.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    ).map((file) => {
        const { path, ...attrs } = file;

        return {
            ...attrs,
        };
    });

    return NextResponse.json({ data: tasks }, { status: 200 });
}
