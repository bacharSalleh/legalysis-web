import { User, File } from "@prisma/client";
import type { Icon } from "lucide-react";
import { PACK_NAMES } from "@/config/payment";
import { Icons } from "@/components/icons";

export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
    comingSoon?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
} & (
    | {
          href: string;
          items?: never;
      }
    | {
          href?: string;
          items: NavLink[];
      }
);

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        twitter: string;
        github: string;
    };
};

export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};

export type HomeConfig = {
    mainNav: MainNavItem[];
};

export type DashboardConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
    taskType: DropDownItem[];
    table: {
        pageSize: number;
    };
};

export type PackDetails = {
    name: PackValues;
    stripePriceId: string;
    credits: number;
};

export type UserSubscriptionPlan = PackDetails &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripeSubscriptionItemId"> & {
        stripeCurrentPeriodEnd: number;
        isFree: boolean;
    };

export type DropDownItem = {
    title: string;
    value: string;
};

export type Task = Pick<
    Omit<File, "path">,
    | "id"
    | "updatedAt"
    | "fileType"
    | "resultPath"
    | "status"
    | "taskName"
    | "creditsConsume"
    | "errorReason"
    | "taskType"
>;

export type PackKeys = keyof typeof PACK_NAMES; // "STARTER_MONTHLY" | "STARTER_YEARLY" | "PRO_MONTHLY" | ...

// Extract values as a type.
export type PackValues = (typeof PACK_NAMES)[PackKeys];
