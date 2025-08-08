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
import { useState } from "react";
import { UseProfileForm } from "@/hooks/useForms";
import toast from "react-hot-toast";
import { usePage } from "@inertiajs/react";
import { sharedData } from "@/types";
import FlashMessage from "@/Components/ui/flashMessage";

const ProfileUpdate = ({
    isEditing,
    setIsEditing,
}: {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}) => {
    const { auth, flash } = usePage<sharedData>().props;

    const { data, setData, patch, processing, errors, reset } =
        UseProfileForm();

    const updateUserField = (field: keyof typeof data, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        patch(route("profile.update"), {
            onSuccess: () => {
                toast.success("Profile berhasil diperbarui.");
            },
            onError: (errors) => {
                toast.error("Gagal memperbarui profile:", errors);
                reset();
            },
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    return (
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
                                            data.avatar ||
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
                                <p className="text-gray-600">Position</p>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
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
                                        <div className="flex items-center gap-2 p-2 rounded-md">
                                            <User className="h-4 w-4 text-gray-500" />
                                            {data.name}
                                        </div>
                                    )}
                                    {errors.name && (
                                        <FlashMessage message={errors.name} />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="position">Status</Label>
                                    <div className="flex items-center gap-2 p-2 rounded-md">
                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                        <span>{data.membership_status}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
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
                                        <div className="flex items-center gap-2 p-2 rounded-md">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <span>{data.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Phone</Label>
                                    {isEditing ? (
                                        <Input
                                            id="phone_number"
                                            name="phone_number"
                                            type="text"
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                updateUserField(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 p-2 rounded-md">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span>{data.phone_number}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
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
                                        <div className="flex items-center gap-2 p-2 rounded-md">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            <span>{data.address}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Join Date</Label>
                                    <div className="flex items-center gap-2 p-2 rounded-md">
                                        {isEditing ? (
                                            <Input
                                                type="date"
                                                name="join_date"
                                                value={data.join_date}
                                                onChange={(e) =>
                                                    updateUserField(
                                                        "join_date",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>{data.join_date}</span>
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
                                                <div className="p-3 rounded-md">
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
    );
};

export default ProfileUpdate;
