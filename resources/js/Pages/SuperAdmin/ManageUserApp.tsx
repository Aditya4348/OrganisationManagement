import DashboardLayout from "@/Layouts/DashboardLayout";
import { BreadcrumbItem, PageProps } from "@/types";
import { DataTable } from "@/Components/ui/table";
import { ColumnUSERS, USERS } from '@/types/columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { usePage } from "@inertiajs/react";
import toast, { ToastBar } from "react-hot-toast";
import { useState } from "react";
import UserForm from "../FormPage/FormUserApp";

interface PROPS extends PageProps {
        response: {
            message: string;
            count: number;
            data: {
                users: USERS[];
            };
        };
    };

const ManageUserApp = ({}) => {
    const { auth, response } = usePage<PROPS>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const Breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Manage User App",
            href: "/manage-user-app",
        },
    ];

    const tableActions = {
        export: () => { toast('Tunggu sebentar, sedang mengunduh...'); window.location.href = route('student.export') },
        exportTemplate: () => { toast('Tunggu sebentar, sedang mengunduh...'); window.location.href = route('student.export-template') },
        import: () => setIsDialogOpen(true),
    };


    return (
        <DashboardLayout breadcrumbs={Breadcrumbs} title="Manage Users">
            <main className="flex flex-col gap-6">
                <Tabs defaultValue="list-User">
                    <TabsList>
                        <TabsTrigger value="list-User">
                            Daftar Anggota
                        </TabsTrigger>
                        <TabsTrigger value="create-User">
                            Tambah Anggota
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="list-User">
                        <DataTable columns={ColumnUSERS} data={response.data.users} actions={tableActions}/>
                    </TabsContent>
                    <TabsContent value="create-User">
                        <UserForm />
                    </TabsContent>
                </Tabs>

                {/* Dialog Import */}
                {/* <DialogImportStudents isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}

                {/* Pie Chart */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"></div>
            </main>
        </DashboardLayout>
    );
};

export default ManageUserApp;
