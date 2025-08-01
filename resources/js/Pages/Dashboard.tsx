import DashboardLayout from "@/Layouts/DashboardLayout";
import { BreadcrumbItem, sharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Page() {
    const { auth } = usePage<sharedData>().props;
    console.log(auth);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                {auth.roles.includes("superAdmin") && (
                    <h1>anda adalah super admin</h1>
                )}
                {auth.roles.includes("admin") && (
                    <h1>anda adalah admin</h1>
                )}
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </DashboardLayout>
    );
}
