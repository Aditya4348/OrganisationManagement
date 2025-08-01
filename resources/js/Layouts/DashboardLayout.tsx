import { cn } from "@/lib/utils"
        import {
          SidebarInset,
          SidebarProvider,
        } from "@/Components/ui/sidebar"
import AppSideBarHeader from "@/Components/AppSideBarHeader";
import { AppSidebar } from "@/Components/app-sidebar";
import { BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { Head } from "@inertiajs/react";



const DashboardLayout = ({
  children,
  className,
  breadcrumbs,
  title = "Profile",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  breadcrumbs?: BreadcrumbItemType[]
}) => {
    return (
            <SidebarProvider>
                <Head title={title} />
              <AppSidebar />
              <SidebarInset>
                <AppSideBarHeader breadcrumbs={breadcrumbs}/>   
                <main className={cn('p-6', className)}>
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
    );
}


export default DashboardLayout