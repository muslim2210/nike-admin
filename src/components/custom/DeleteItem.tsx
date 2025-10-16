"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner';
import { useCollectionApi } from '@/hooks/useCollectionApi';
interface DeleteProps {
  item: string;
  id: string;
  onDeleted?: () => void
}

const DeleteItem: React.FC<DeleteProps> = ({ item, id, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { deleteCollectionApi } = useCollectionApi();

  const onDelete = async () => {
    setLoading(true);
    deleteCollectionApi(id)
    .then(() => {
      console.info(`[DELETE_${item.toUpperCase()}]`, item, id);
      toast.success(`${item} deleted successfully!`);
      onDeleted?.();
    })
    .catch((err) => {
      toast.error(err.message || err || "Something went wrong, please try again.");
      console.log(`[DELETE_${item.toUpperCase()}]`, err)
    })
    .finally(() => setLoading(false));
  };


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
