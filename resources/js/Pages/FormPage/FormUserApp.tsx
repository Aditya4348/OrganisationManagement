import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    CalendarIcon,
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Briefcase,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input, InputGroup } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseCreatedUsers } from "@/hooks/useForms";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export default function UserForm() {
    const { data, setData, post, processing, errors, reset } =
        UseCreatedUsers();

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    User Information Form
                </CardTitle>
                <CardDescription>
                    Please fill in all the required information to create or
                    update a user profile.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <Avatar className="h-32 w-32">
                        <AvatarImage
                            src={
                                data.avatar_preview ||
                                (data.avatar instanceof File
                                    ? URL.createObjectURL(data.avatar)
                                    : data.avatar || "/placeholder.svg")
                            }
                            alt={data.name || "Avatar"}
                        />
                        <AvatarFallback className="text-2xl">
                            {data.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (!e.target.files?.length) return;

                            setData("avatar", e.target.files[0]); // langsung ambil file pertama
                            setData(
                                "avatar_preview",
                                URL.createObjectURL(e.target.files[0])
                            );
                        }}
                    />
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup
                                id="name"
                                label="Nama"
                                type="text"
                                value={data.name}
                                placeholder="Masukkan nama lengkap"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors.name}
                                name="name"
                            />

                            <InputGroup
                                id="email"
                                label="Email"
                                type="text"
                                value={data.email}
                                placeholder="Masukkan Email lengkap"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                                name="email"
                            />

                            <InputGroup
                                id="phone_number"
                                label="No HP"
                                type="text"
                                value={data.phone_number}
                                placeholder="Masukkan phone_number lengkap"
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                error={errors.phone_number}
                                name="phone_number"
                            />
                            <InputGroup
                                id="address"
                                label="Alamat"
                                type="text"
                                value={data.address}
                                placeholder="Masukkan Alamat lengkap"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                error={errors.address}
                                name="address"
                            />
                        </div>
                    </div>

                    {/* Work Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Member Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup
                                id="join_date"
                                label="Tanggal Gabung"
                                type="date"
                                value={data.join_date}
                                onChange={(e) =>
                                    setData("join_date", e.target.value)
                                }
                                error={errors.join_date}
                                name="join_date"
                            />

                            <div className="">
                                <label htmlFor="membership_status">
                                    Status Anggota
                                </label>
                                <Select
                                    name="membership_status"
                                    value={data.membership_status}
                                    onValueChange={(value) =>
                                        setData("membership_status", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            Aktif
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Tidak Aktif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Gender Information
                        </h3>
                        <div className="">
                            <label htmlFor="gender">Jenis Kelamin</label>
                            <Select
                                name="gender"
                                value={data.gender}
                                onValueChange={(value) =>
                                    setData("gender", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">
                                        Laki-Laki
                                    </SelectItem>
                                    <SelectItem value="female">
                                        Perempuan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">
                            Save User
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
