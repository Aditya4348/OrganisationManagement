import { Button } from "@/Components/ui/button";
import { Edit3 } from "lucide-react";
import { title } from "process";
import { Toaster } from "react-hot-toast";

const SettingsLayout = ({ children, title, subTitle }: { children: React.ReactNode, title: string, subTitle: string }) => {
    return (
        <div className="min-h-screen py-5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-col items-start justify-between">
                        <h1 className="text-3xl font-bold">
                            {title}
                        </h1>
                        <p className="mt-2">
                            {subTitle}
                        </p>
                    </div>
                    <Toaster
                        {...({
                            position: "top-right",
                            toastOptions: {
                                duration: 3000,
                            },
                        } as any)}
                    />
                </div>

                {children}
            </div>
        </div>
    );
};

export default SettingsLayout;
