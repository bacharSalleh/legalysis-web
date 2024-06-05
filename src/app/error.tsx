"use client";

import {Button} from "@/components/ui/button";

export default function Error({error, reset}: { error: Error; reset: () => void }) {
    return (
        <div className="flex-1 flex flex-col space-y-4 justify-center items-center">
            <h2>Something went wrong!</h2>
            <Button variant={"outline"} onClick={() => (window.location.href = "/")}>
                Try again
            </Button>
        </div>
    );
}
