"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CollectionType } from "@/types/model";
import Image from "next/image";
import DeleteItem from "../custom/DeleteItem";

interface ColumnProps {
  onDeleted?: () => void;
}

export function columns({ onDeleted }: ColumnProps): ColumnDef<CollectionType>[] {
  return [
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image src={row.original.image} alt={row.original.title} width={300} height={300} className="w-[70px] h-auto" />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original.id}`}
        className="hover:text-red-1 capitalize font-uniqlo"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Total Products",
    cell: ({ row }) => <p>{row.original.products?.length || '0'}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`/collections/${row.original.id}`}>
          <Button className="bg-yellow-400">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <DeleteItem item="collections" id={row.original.id} onDeleted={onDeleted} />
      </div>
    ),
  },
  ]
}
  

