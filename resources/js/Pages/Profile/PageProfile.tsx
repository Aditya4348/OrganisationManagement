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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Separator } from "@/Components/ui/separator";
import { BreadcrumbItem, PageProps, sharedData } from "@/types";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { useState } from "react";
import { usePage, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { get } from "http";

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
    const { auth } = usePage<sharedData>().props;

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: auth.user.name || "",
        email: auth.user.email || "",
        gender: auth.user.gender || "",
        phone_number: auth.user.phone_number || "",
        address: auth.user.address || "",
        join_date: auth.user.join_date || "",
        membership_status: auth.user.membership_status || "",
    });

    const updateUserField = (field: keyof typeof data, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        patch(route("profile.update"));
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

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
                    <form onSubmit={handleSubmit}>
                        <Card className="mb-6">
                            <CardHeader className="pb-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">
                                        Personal Information
                                    </CardTitle>
                                    {!isEditing ? (
                                        <div></div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                type="submit"
                                                disabled={processing}
                                                className="flex items-center gap-2"
                                            >
                                                <Save className="h-4 w-4" />
                                                Save
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleCancel}
                                                className="flex items-center gap-2 bg-transparent"
                                            >
                                                <X className="h-4 w-4" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            <Avatar className="h-32 w-32">
                                                <AvatarImage
                                                    src={
                                                        auth.user.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={data.name}
                                                />
                                                <AvatarFallback className="text-2xl">
                                                    {data.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            {isEditing && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                                                >
                                                    <Camera className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <h2 className="text-xl font-semibold">
                                                {auth.user.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                Position
                                            </p>
                                        </div>
                                    </div>

                                    {/* Profile Details */}
                                    <div className="flex-1 space-y-6">
                                        {/* Basic Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Full Name
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            updateUserField(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                        <span>{data.name}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="position">
                                                    Status
                                                </Label>
                                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                    <Briefcase className="h-4 w-4 text-gray-500" />
                                                    <span>
                                                        {data.membership_status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            updateUserField(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                        <Mail className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            {data.email}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    Phone
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="phone_number"
                                                        name="phone_number"
                                                        type="number"
                                                        value={
                                                            data.phone_number
                                                        }
                                                        onChange={(e) =>
                                                            updateUserField(
                                                                "phone_number",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                        <Phone className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            {data.phone_number}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">
                                                    Location
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        value={data.address}
                                                        onChange={(e) =>
                                                            updateUserField(
                                                                "address",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                        <MapPin className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            {data.address}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Join Date</Label>
                                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                    {isEditing ? (
                                                        <Input
                                                            type="date"
                                                            name="join_date"
                                                            value={
                                                                data.join_date
                                                            }
                                                            onChange={(e) =>
                                                                updateUserField(
                                                                    "join_date",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-gray-500" />
                                                            <span>
                                                                {data.join_date}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Bio Section */}
                                        {/* <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            {isEditing ? (
                                                <Textarea
                                                    id="bio"
                                                    value="belum ada Bio"
                                                    onChange={(e) =>
                                                        updateUserField(
                                                            "bio",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={4}
                                                    placeholder="Tell us about yourself..."
                                                />
                                            ) : (
                                                <div className="p-3 bg-gray-50 rounded-md">
                                                    <p className="text-gray-700">
                                                        belum ada Bio
                                                    </p>
                                                </div>
                                            )}
                                        </div> */}

                                        <Separator />

                                        {/* Skills Section */}
                                        {/* <div className="space-y-3">
                                        <Label>Skills</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.skills.map(
                                                (skill, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="px-3 py-1"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            )}
                                            {isEditing && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 px-3 bg-transparent"
                                                >
                                                    + Add Skill
                                                </Button>
                                            )}
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                    {/* Additional Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Activity Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                Profile updated
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                New project assigned
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                1 day ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                Password changed
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                3 days ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Settings Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Quick Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-transparent"
                                    >
                                        Change Password
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-transparent"
                                    >
                                        Privacy Settings
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-transparent"
                                    >
                                        Notification Preferences
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
