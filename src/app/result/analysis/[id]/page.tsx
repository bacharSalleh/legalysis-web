// import { env } from "@/env.mjs"
import { ResultHeader } from "@/components/results-header";
import { ResultShell } from "@/components/shell";
import { TypographyH4 } from "@/components/ui/typography";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

async function getResult(taskId: string): Promise<string | null> {
    const user = await getCurrentUser();

    if (!user) {
        return redirect(authOptions?.pages?.signIn || "/login");
    }

    if (!taskId || !user) {
        return redirect("/");
    }

    const task = await db.file.findFirst({ where: { id: taskId } });

    if (!task?.resultPath || user.id !== task.userId) {
        return redirect("/");
    }

    const s3 = new S3({
        forcePathStyle: false,
        region: process.env.BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY!,
            secretAccessKey: process.env.SECRET_KEY!,
        },
    });

    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_RESULT_NAME, // replace with your bucket name
        Key: task.resultPath.split("/").slice(-1)[0], // replace with your object key
    });

    try {
        const response = await s3.send(command);
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        const str = await response.Body?.transformToString();

        return str ?? null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

interface PageProps {
    params: {
        id: string;
    };
}

export default async function IndexPage({ params }: PageProps) {
    const result = await getResult(params.id);

    return (
        <>
            <ResultShell>
                <ResultHeader result={result} type="analysis" />

                <div className="mx-auto max-w-[64rem] p-4">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="rounded-md p-6 space-y-4">
                            {result &&
                                JSON.parse(result).map((item: any, index: number) => (
                                    <div key={index} className="space-y-0">
                                        <TypographyH4 className="mb-1">{item.Description.result.title}</TypographyH4>
                                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                            {item.Description.result.analysisPoints.map(
                                                (point: string, pointIndex: number) => (
                                                    <li key={pointIndex} className="text-sm text-muted-foreground">
                                                        {point}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </ResultShell>
        </>
    );
}
