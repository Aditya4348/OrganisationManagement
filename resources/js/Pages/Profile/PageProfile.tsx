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
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { BreadcrumbItem, PageProps, sharedData } from "@/types";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { FormEventHandler, useRef, useState } from "react";
import { usePage, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Toaster, toast } from "react-hot-toast";

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
    const currentPassword = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        patch,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        name: auth.user.name || "",
        email: auth.user.email || "",
        gender: auth.user.gender || "",
        phone_number: auth.user.phone_number || "",
        address: auth.user.address || "",
        join_date: auth.user.join_date || "",
        membership_status: auth.user.membership_status || "",
        current_password: "",
        password_confirmation: "",
        password: "",
    });

    const handleSubmitUpdatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        // Validasi awal di sisi frontend
        if (data.password !== data.password_confirmation) {
            alert("Password baru dan konfirmasi password tidak cocok.");
            return;
        }

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Password berhasil diperbarui.");
                reset();
            },
            onError: (errors) => {
                toast.error("Gagal memperbarui password:", errors);
                if (errors.current_password) {
                    reset("current_password");
                    currentPassword.current?.focus();
                }

                if (errors.password || errors.password_confirmation) {
                    reset("password", "password_confirmation");
                    password.current?.focus();
                }
            },
        });
    };

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
                    <form onSubmit={handleSubmit}>
                        <Card className="mb-6">
                            <CardHeader className="pb-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">
                                        Personal Information
                                    </CardTitle>
                                    {!isEditing ? null : (
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
                                                <Label htmlFor="phone_number">
                                                    Phone
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="phone_number"
                                                        name="phone_number"
                                                        type="text"
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
                                    Change Password
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-10">
                                    <form onSubmit={handleSubmitUpdatePassword}>
                                        <div className="space-y-1">
                                            <Label htmlFor="name">
                                                Current Password
                                            </Label>
                                            <Input
                                                type="password"
                                                id="current_password"
                                                ref={currentPassword}
                                                value={data.current_password}
                                                name="current_password"
                                                onChange={(e) => {
                                                    setData(
                                                        "current_password",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            {errors.current_password && (
                                                <p className="text-sm text-red-600">
                                                    {
                                                        errors.current_password
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                New Password
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                ref={password}
                                                value={data.password}
                                                name="password"
                                                onChange={(e) => {
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-600">
                                                    {
                                                        errors.password
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password_confirmation"
                                                ref={password}
                                                value={data.password_confirmation}
                                                name="password_confirmation"
                                                onChange={(e) => {
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            {errors.password_confirmation && (
                                                <p className="text-sm text-red-600">
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Change Password
                                        </Button>
                                    </form>
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
