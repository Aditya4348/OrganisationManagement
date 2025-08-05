import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Skull } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { UseProfileForm } from "@/hooks/useForms";
import { useRef } from "react";

const DeleteUserForm = () => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = UseProfileForm();

    const deleteUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordInput.current?.focus();
                }
            },
        });
    };

    const handleCancel = () => {
        reset();
        passwordInput.current?.focus();
    };

    return (
        <Card>
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-t-md shadow-md p-5 flex flex-row items-center gap-3">
                <Skull />
                <CardTitle className="text-lg font-semibold">
                    Remove Account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5 mt-3">
                    <p className="text-red-600 font-medium text-sm">
                        <strong>Warning!</strong> Once your account is deleted,
                        all of its resources and data will also be permanently
                        deleted. Please enter your password to confirm you would
                        like to permanently delete your account.
                    </p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                Delete Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Are you sure you want to delete your account?
                            </DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its
                                resources and data will also be permanently
                                deleted. Please enter your password to confirm
                                you would like to permanently delete your
                                account.
                            </DialogDescription>
                            <form className="space-y-6" onSubmit={deleteUser}>
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            variant="secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button
                                        variant="destructive"
                                        disabled={processing}
                                        asChild
                                    >
                                        <button type="submit">
                                            Delete account
                                        </button>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default DeleteUserForm;
