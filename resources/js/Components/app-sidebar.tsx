import * as React from "react";
import { NavMain } from "@/Components/nav-main";
import { NavProjects } from "@/Components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import { data } from "@/lib/menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { sharedData } from "@/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<sharedData>().props;
    const menu = data;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={menu.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={menu.navMain} />
                <NavProjects projects={menu.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: auth.user.name,
                        email: auth.user.email,
                        avatar: auth.user.avatar || "",
                        role: "guest", // atau ambil dari tempat lain
                        email_verified_at: auth.user.email_verified_at ?? "",
                        created_at: auth.user.created_at,
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
