import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Edit3,
    Camera,
    Save,
    X,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { BreadcrumbItem, PageProps } from "@/types";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Toaster } from "react-hot-toast";
import ProfileUpdate from "./Partials/ProfileUpdate";
import PasswordUpdate from "./Partials/PasswordUpdate";
import { useState } from "react";
import SettingsLayout from "@/Layouts/SettingsLayout";
import DeleteUserForm from "./Partials/Delete-User";

export default function PageProfile({
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
    const [isEditing, setIsEditing] = useState(false);

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout title="Profile" subTitle="Update your profile information and Password">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 m-auto mb-5"
                >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                </Button>
                {/* Main Profile Card */}
                <ProfileUpdate
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />

                {/* Additional Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Activity Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Change Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-10">
                                <PasswordUpdate />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Remove Account Card */}
                    <DeleteUserForm />
                </div>
            </SettingsLayout>
        </DashboardLayout>
    );
}
