import DashboardLayout from "@/Layouts/DashboardLayout";
import { BreadcrumbItem } from "@/types";

export default function Page() {
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
                hello
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </DashboardLayout>
    );
}
