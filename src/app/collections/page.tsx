"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CollectionType } from "@/types/model";
import Loader from "@/components/ui/Loader";
import { DataTable, useDataTable } from "@/components/shared/TableComponent";
import { columns } from "@/components/layout/CollectionColumn";
import { useCollectionApi } from "@/hooks/useCollectionApi";

const CollectionsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections ] = useState<CollectionType[]>([]);

  const { getCollectionsApi } = useCollectionApi();

  const fetchCollections = async () => {
      setLoading(true);
      getCollectionsApi().then((data) => {
        console.info("[collections_GET]", data);
        setCollections(data as CollectionType[]);
      })
      .catch((err) => console.log("[collections_GET]", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const cols = columns({ onDeleted: fetchCollections });
  const { table } = useDataTable(collections, cols);
  

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-3 md:px-10">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-black capitalize">
          collections
        </p>
        <Button
        className="rounded-full flex justify-center items-center w-7 h-7"
          onClick={() => router.push("/collections/create")}
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

export default CollectionsPage;
