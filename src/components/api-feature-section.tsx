import { Icons } from "./icons";
import { Badge } from "./ui/badge";

const ApiFeatureSection = () => {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex flex-col justify-between rounded-md p-6 gap-y-4">
                <Icons.api className="w-20 h-[86px]" />

                <div className="space-y-2">
                    <h3 className="font-bold">API Access to Our Legal Document Services</h3>
                    <p className="text-sm text-muted-foreground">
                        Gain direct access to our powerful AI technology through our API. Integrate our document
                        analysis and summarization features directly into your own systems and workflows. Streamline
                        your legal document processes like never before.
                    </p>
                </div>
            </div>
            <Badge className="absolute right-2 top-2 text-primary-foreground bg-green-300" variant={"default"}>
                New
            </Badge>
        </div>
    );
};

export default ApiFeatureSection;
