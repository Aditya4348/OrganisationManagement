import { sharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import {
    BookOpen,
    Bot,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

const UseNavData = () => {
    const { auth } = usePage<sharedData>().props;

    return {
        user: {
            name: auth.user.name,
            email: auth.user.email,
            avatar: auth.user.avatar || "",
        },
        teams:{
                name: "PHBN",
                logo: GalleryVerticalEnd,
                plan: auth?.roles?.[0] || "default",
            },
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: "Home",
                        url: '/dashboard',
                    },
                    {
                        title: "Manage Users",
                        url: "/dashboard/member",
                    },
                    {
                        title: "Activity Users",
                        url: "#",
                    },
                    {
                        title: "Manage Role",
                        url: "#",
                    },
                ],
            },
            {
                title: "Sekretariat",
                url: "#",
                icon: Bot,
                items: [
                    {
                        title: "Manage Agenda",
                        url: "#",
                    },
                    {
                        title: "Manage Documents",
                        url: "#",
                    },
                    {
                        title: "Create Report",
                        url: "#",
                    },
                ],
            },
            {
                title: "Documentation",
                url: "#",
                icon: BookOpen,
                items: [
                    {
                        title: "Introduction",
                        url: "#",
                    },
                    {
                        title: "Get Started",
                        url: "#",
                    },
                    {
                        title: "Tutorials",
                        url: "#",
                    },
                    {
                        title: "Changelog",
                        url: "#",
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "Team",
                        url: "#",
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Limits",
                        url: "#",
                    },
                ],
            },
        ],
        projects: [
            {
                name: "Design Engineering",
                url: "#",
                icon: Frame,
            },
            {
                name: "Sales & Marketing",
                url: "#",
                icon: PieChart,
            },
            {
                name: "Travel",
                url: "#",
                icon: Map,
            },
        ],
    };
};

export default UseNavData;