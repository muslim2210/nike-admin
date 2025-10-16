"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/model";
import Loader from "@/components/ui/Loader";
import { DataTable, useDataTable } from "@/components/shared/TableComponent";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<ProductType>[] = [
  { accessorKey: "media", header: "Media" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "collection", header: "Collection" },
  { accessorKey: "sizes", header: "Sizes" },
  { accessorKey: "colors", header: "Colors" },
  { accessorKey: "price", header: "Price" },
];

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts ] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      console.warn("[products_GET]", data);
      setProducts(data.data as ProductType[]);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const { table } = useDataTable(products, columns);

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-3 md:px-10">
      <div className="flex items-center justify-between">
        <p className="title-page">
          Products
        </p>
        <Button
        className="rounded-full flex justify-center items-center w-7 h-7"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mt-2" />
      <DataTable table={table} columns={columns} searchKey="title" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Products;
