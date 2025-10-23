"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/model";
import Loader from "@/components/ui/Loader";
import { DataTable, useDataTable } from "@/components/shared/TableComponent";
import { useProductsApi } from "@/hooks/useProductsApi";
import { columns } from "@/components/layout/ProductColumn";
import { toast } from "sonner";



const ProductsPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts ] = useState<ProductType[]>([]);

  const { getProductsApi } = useProductsApi();

  const fetchProducts = async () => {
    setLoading(true);
    getProductsApi().then((data) => {
      console.info("[products_GET]", data);
      setProducts(data as ProductType[]);
    })
    .catch((err) => {
      console.error("[products_GET]", err)
      toast.error(err.message || err || "Something went wrong, please try again.");
    })
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cols = columns({ onDeleted: fetchProducts });
  const { table } = useDataTable(products, cols);

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
          onClick={() => router.push("/products/create")}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mt-2" />
      <DataTable table={table} columns={cols} searchKey="title" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProductsPage;
