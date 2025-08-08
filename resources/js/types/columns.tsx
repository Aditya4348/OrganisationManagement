import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import clsx from "clsx";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type USERS = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone_number?: string;
    address?: string;
    membership_status?: "active" | "inactive";
    join_date?: string;
    created_at: string;
    updated_at: string;
};

export const ColumnUSERS: ColumnDef<USERS>[] = [
       {
        accessorKey: "no",
        header: () => (
            <span className="font-semibold text-center text-gray-600">No</span>
        ),
        cell: (info) => (
            <div className="text-center font-medium rounded-md py-1">
                {info.row.index + 1}
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: () => (
            <span className="font-semibold text-gray-600">Nama</span>
        ),
        cell: ({ row }) => (
            <Link
                className="underline underline-offset-2 transition-colors"
                href={`/users/${row.original.id}`}
            >
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: "email",
        header: () => (
            <span className="font-semibold text-gray-600">Email</span>
        ),
        cell: ({ row }) => (
            <span className="">{row.original.email}</span>
        ),
    },
    {
        accessorKey: "phone_number",
        header: () => (
            <span className="font-semibold text-gray-600">No. HP</span>
        ),
        cell: ({ row }) => (
            <span className="">{row.original.phone_number}</span>
        ),
    },
    {
        accessorKey: "address",
        header: () => (
            <span className="font-semibold text-gray-600">Alamat</span>
        ),
        cell: ({ row }) => (
            <span className="truncate max-w-[200px] text-center" title={row.original.address}>
                {row.original.address}
            </span>
        ),
    },
    {
        accessorKey: "membership_status",
        header: () => (
            <span className="font-semibold text-gray-600">Status Anggota</span>
        ),
        cell: ({ row }) => {
            const status = row.original.membership_status;
            return (
                <span
                    className={clsx(
                        "px-2 py-1 rounded-full text-xs font-semibold",
                        status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    )}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "join_date",
        header: () => (
            <span className="font-semibold text-gray-600">Tanggal Bergabung</span>
        ),
        cell: ({ row }) => (
            <span className="">
                {dayjs(row.original.join_date).format("DD MMM YYYY")}
            </span>
        ),
    },
];