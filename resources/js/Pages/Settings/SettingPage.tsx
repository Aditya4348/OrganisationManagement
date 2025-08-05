import { Appearance, useAppearance } from "@/hooks/use-apperance";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { cn } from "@/lib/utils";
import { BreadcrumbItem } from "@/types";
import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

const SettingPage = ({ className, ...props }: { className?: HtmlHTMLAttributes<HTMLDivElement>}) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Appearance",
            href: "/appearance",
        },
    ];

    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ];

    return (
        <DashboardLayout title="Settings" breadcrumbs={breadcrumbs}>
            <SettingsLayout
                title="Appearance"
                subTitle="Manage Your Appearance"
            >
                <div
                    className={cn(
                        "inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",
                        className
                    )}
                    {...props}
                >
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            onClick={() => updateAppearance(value)}
                            className={cn(
                                "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
                                appearance === value
                                    ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                                    : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
                            )}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            </SettingsLayout>
        </DashboardLayout>
    );
};

export default SettingPage;
