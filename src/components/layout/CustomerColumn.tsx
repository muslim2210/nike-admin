"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerType } from "@/types/model";


export function columns(): ColumnDef<CustomerType>[] {
  return [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => (
      <p>{row.original.name}</p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p>{row.original.email}</p>
    ),
  },
  {
    accessorKey: "orders",
    header: "Total Orders",
    cell: ({ row }) => <p>{row.original.orders?.length || '0'}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => (
      <p>{row.original.phone}</p>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <p>{row.original.address}</p>
    ),
  },
];
}
  

