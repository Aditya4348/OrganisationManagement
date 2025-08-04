import { UseProfileForm } from "@/hooks/useForms";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { FormEventHandler, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/Components/ui/button";

const PasswordUpdate = () => {
    
       const currentPassword = useRef<HTMLInputElement>(null);
        const password = useRef<HTMLInputElement>(null);

        const{ data, setData, put, processing, errors, reset,} = UseProfileForm();
    
        const handleSubmitUpdatePassword: FormEventHandler = (e) => {
            e.preventDefault();
    
            // Validasi awal di sisi frontend
            if (data.password !== data.password_confirmation) {
                alert("Password baru dan konfirmasi password tidak cocok.");
                return;
            }
    
            put(route("password.update"), {
                // Mempertahankan scroll position saat memperbarui password
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

    return (
        <form onSubmit={handleSubmitUpdatePassword}>
            <div className="space-y-1">
                <Label htmlFor="name">Current Password</Label>
                <Input
                    type="password"
                    id="current_password"
                    ref={currentPassword}
                    value={data.current_password}
                    name="current_password"
                    onChange={(e) => {
                        setData("current_password", e.target.value);
                    }}
                />
                {errors.current_password && (
                    <p className="text-sm text-red-600">
                        {errors.current_password}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">New Password</Label>
                <Input
                    type="password"
                    id="password"
                    ref={password}
                    value={data.password}
                    name="password"
                    onChange={(e) => {
                        setData("password", e.target.value);
                    }}
                />
                {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                    type="password"
                    id="password_confirmation"
                    ref={password}
                    value={data.password_confirmation}
                    name="password_confirmation"
                    onChange={(e) => {
                        setData("password_confirmation", e.target.value);
                    }}
                />
                {errors.password_confirmation && (
                    <p className="text-sm text-red-600">
                        {errors.password_confirmation}
                    </p>
                )}
            </div>
            <Button type="submit" className="w-full">
                Change Password
            </Button>
        </form>
    );
};


export default PasswordUpdate;