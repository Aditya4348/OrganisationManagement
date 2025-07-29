import * as React from "react"
import { NavMain } from "@/Components/nav-main"
import { NavProjects } from "@/Components/nav-projects"
import { NavUser } from "@/Components/nav-user"
import { TeamSwitcher } from "@/Components/team-switcher"
import { data } from "@/lib/menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menu = data

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
        <NavUser user={menu.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
