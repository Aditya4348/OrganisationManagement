import DashboardLayout from "@/Layouts/DashboardLayout";
import { BreadcrumbItem } from "@/types";

const SettingPage = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Settings",
            href: "/settings",
        }
    ]

    return (
        <DashboardLayout title="Settings" breadcrumbs={breadcrumbs}>
            <h1>Settings Page</h1>
        </DashboardLayout>
    );
};

export default SettingPage;