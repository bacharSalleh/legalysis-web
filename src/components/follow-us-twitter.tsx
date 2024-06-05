import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";

const FollowUsTwitter = () => {
    return (
        <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
        >
            Follow along on Twitter <Icons.twitter className="inline w-6 h-5" />
        </Link>
    );
};

export default FollowUsTwitter;
