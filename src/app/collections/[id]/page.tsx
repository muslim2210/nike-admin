'use client'
import CollectionForm from '@/components/layout/CollectionForm';
import Loader from '@/components/ui/Loader';
import { useCollectionApi } from '@/hooks/useCollectionApi';
import { CollectionType } from '@/types/model';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CollectionDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = React.use(params);
  const { getCollectionByIdApi } = useCollectionApi();

  const fetchCollectionDetail = async () => {
    setLoading(true);
    getCollectionByIdApi(id).then((data: CollectionType) => {
      console.info("[collection_GET]", data);
      setCollection(data as CollectionType);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: any) => {
      console.log("[collection_GET]", err);
      toast.error(err.message || err || "Something went wrong, please try again.");
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchCollectionDetail();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collection} />
  )
}

export default CollectionDetailPage
