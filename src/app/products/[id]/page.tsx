'use client'
import ProductForm from '@/components/layout/ProductForm';
import Loader from '@/components/ui/Loader';
import { useProductsApi } from '@/hooks/useProductsApi';
import { ProductType } from '@/types/model';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = React.use(params);
  const {getProductByIdApi } = useProductsApi();

  const fetchProductDetail = async () => {
    setLoading(true);
    getProductByIdApi(id).then((data: ProductType) => {
      console.info("[product_GET]", data);
      setProduct(data as ProductType);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: any) => {
      console.log("[collection_GET]", err);
      toast.error(err.message || err || "Something went wrong, please try again.");
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ProductForm initialData={product} />
  )
}

export default ProductDetailPage;
