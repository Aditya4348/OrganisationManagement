import { sharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";

const UseProfileForm = () => {
    const { auth } = usePage<sharedData>().props;

    const form = useForm({
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

    return form;
};

export { UseProfileForm };
