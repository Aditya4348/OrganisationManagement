import { Role, sharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";

type FormData = {
    name: string;
    email: string;
    gender: string;
    phone_number: string;
    address: string;
    join_date: string;
    membership_status: string;
    current_password: string;
    role: string;
    password_confirmation: string;
    password: string;
    avatar?: string | File;
    avatar_preview: string;
};

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
            avatar: "",
            avatar_preview: auth.user.avatar || "",
            current_password: "",
            password_confirmation: "",
            password: "",
    });

    return form;
};

const UseCreatedUsers = ({Roles}: {Roles: Role[]}) => {
    
    const form = useForm<FormData>({
            name: "",
            email: "",
            gender: "",
            phone_number: "",
            address: "",
            join_date: "",
            avatar: "",
            role: Roles[0]?.id.toString() || "",
            avatar_preview: "",
            membership_status: "",
            current_password: "",
            password_confirmation: "",
            password: "",
    });

    return  form
}

export { UseProfileForm, UseCreatedUsers};
