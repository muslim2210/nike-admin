"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CustomerType } from "@/types/model";
import Loader from "@/components/ui/Loader";
import { DataTable, useDataTable } from "@/components/shared/TableComponent";
import { columns } from "@/components/layout/CustomerColumn";
import { toast } from "sonner";
import axios from "axios";



const CustomersPage = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers ] = useState<CustomerType[]>([]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/customers");
      console.info("[Customers_GET]", res);
      setCustomers(res.data.data as CustomerType[]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      console.error("[Customers_GET]", err)
      toast.error(err.message || err || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCustomers();
  }, []);

  const cols = columns();
  const { table } = useDataTable(customers, cols);

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-3 md:px-10">
      <div className="flex items-center justify-between">
        <p className="title-page">
          Customers List
        </p>
      </div>
      <Separator className="mt-2" />
      <DataTable table={table} columns={cols} searchKey="name" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CustomersPage;
