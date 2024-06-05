"use client";

import { User } from "next-auth";
import DashboardPageClient from "./dashboard-page";
import { QueryClient, QueryClientProvider } from "react-query";

interface DashboardWrapperProps {
    user: User & {
        id: string;
    };
}

const queryClient = new QueryClient();

const DashboardWrapper = ({ user }: DashboardWrapperProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardPageClient user={user} />
        </QueryClientProvider>
    );
};

export default DashboardWrapper;
