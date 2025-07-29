import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BreadcrumbItem, PageProps } from "@/types";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import DashboardLayout from "../../Layouts/DashboardLayout";
import AppForm from "@/Components/AppForm";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Profile Page",
            href: "/profile",
        },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <h1>Profile Page</h1>
            <AppForm/>
        </DashboardLayout>
    );
}
