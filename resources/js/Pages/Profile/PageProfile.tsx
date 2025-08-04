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
            <div className="min-h-screen bg-gray-50 py-5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Profile
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your personal information and preferences
                        </p>
                        <Toaster
                            {...({
                                position: "top-right",
                                toastOptions: {
                                    duration: 3000,
                                },
                            } as any)}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Main Profile Card */}
                    <ProfileUpdate isEditing={isEditing} setIsEditing={setIsEditing}/>

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
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Remove Account
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-neutral-300 hover:text-neutral-200 bg-red-600 hover:bg-red-700"
                                    >
                                        Delete Account
                                    </Button>
                                    <p className="text-red-600 font-medium text-sm">
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Placeat ipsam
                                        deleniti, blanditiis aut hic optio
                                        itaque, at natus fugit eligendi maiores
                                        accusantium nemo odit quasi magni
                                        commodi. Incidunt, ratione atque.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
