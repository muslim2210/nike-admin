"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProductType } from "@/types/model";
import Image from "next/image";
import DeleteItem from "../custom/DeleteItem";
import { rupiahFormated } from "@/hooks/useComposable";

interface ColumnProps {
  onDeleted?: () => void;
}

export function columns({ onDeleted }: ColumnProps): ColumnDef<ProductType>[] {
  return [
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image src={row.original.media[0]} alt={row.original.title} width={300} height={300} className="w-[70px] h-auto" />
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
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row.original.colors.map((color) => (
          <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row.original.sizes.map((size) => (
          <p key={size}>{size}</p>
        ))}
      </div>
    ),
  },
  {
  accessorKey: "price",
  header: "Price",
  cell: ({ row }) => {
    return <p>{rupiahFormated(Number(row.original.price))}</p>;
  },
},
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`/products/${row.original.id}`}>
          <Button className="bg-yellow-400">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <DeleteItem item="products" id={row.original.id} onDeleted={onDeleted} />
      </div>
    ),
  },
  ]
}
  

