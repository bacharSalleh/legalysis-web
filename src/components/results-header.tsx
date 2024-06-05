import PDFExportButton from "@/components/pdf-export-btn";

export function ResultHeader({ result, type }: any) {
    return (
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                {type == "analysis" ? "Analysis" : "Summariztion"} Result
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Here are the results of the legal document {type == "analysis" ? "analysis" : "summariztion"}.
            </p>
            <PDFExportButton result={result} type={type} />
        </div>
    );
}
