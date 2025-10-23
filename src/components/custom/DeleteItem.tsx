"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner';
import { useCollectionApi } from '@/hooks/useCollectionApi';
import { useProductsApi } from '@/hooks/useProductsApi';
interface DeleteProps {
  item: string;
  id: string;
  onDeleted?: () => void
}

const DeleteItem: React.FC<DeleteProps> = ({ item, id, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { deleteCollectionApi } = useCollectionApi();
  const { deleteProductApi } = useProductsApi();

  const onDelete = async () => {
    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let deleteFn: (id: string) => Promise<any>;

    switch (item) {
        case "collections":
          deleteFn = deleteCollectionApi;
          break;
        case "products":
          deleteFn = deleteProductApi;
          break;
        default:
          throw new Error(`Unknown item type: ${item}`);
      }

      await deleteFn(id).then(() => {
        console.info(`[DELETE_${item.toUpperCase()}]`, id);
        toast.success(`${item} deleted successfully!`);
        onDeleted?.();
      }).catch((err) => {
        console.error(`[DELETE_${item.toUpperCase()}_ERROR]`, err);
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong while deleting."
        );
      }).finally(() => {
        setLoading(false);
      });
  }

  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type='button' className="bg-red-500 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 text-white" onClick={onDelete}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteItem
