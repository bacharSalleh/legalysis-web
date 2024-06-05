import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
    mainNav: [],
    sidebarNav: [
        {
            title: "Tasks",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "billing",
        },
    ],
    taskType: [
        {
            title: "Analysis",
            value: "analysis",
        },
        {
            title: "Summarization",
            value: "summarize",
        },
    ],
    table: {
        pageSize: 200,
    },
};
