"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UploadImageComponent from "../custom/UploadImageComponent";
import { formSchemaProduct } from "@/lib/schema";
import { useProductsApi } from "@/hooks/useProductsApi";
import { useCollectionApi } from "@/hooks/useCollectionApi";
import { CollectionType, ProductType } from "@/types/model";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TagInput from "../custom/TagInput";

interface ProductFormProps {
  initialData?: ProductType | null;
}
const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const { getCollectionsApi } = useCollectionApi();
  const { postProductApi, updateProductApi } = useProductsApi();

  const form = useForm<z.infer<typeof formSchemaProduct>>({
    resolver: zodResolver(formSchemaProduct),
    defaultValues: initialData || {
      title: "",
      description: "",
      media: [],
      sizes: [],
      colors: [],
      price: undefined,
      tags: [],
      collectionId: "",
    },
  });

  // ─── Fetch collections ───────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getCollectionsApi();
        console.info("[collections_GET]", data);
        setCollections(data as CollectionType[]);
      } catch (err) {
        console.error("[collections_GET_ERROR]", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ─── Submit handler ─────────────────────────────────
  const onSubmit = async (values: z.infer<typeof formSchemaProduct>) => {
    try {
      setLoading(true);
      console.warn("[PRODUCT_FORM_SUBMIT_DEBUG]", values);

      if (initialData) {
        await updateProductApi(initialData.id, values);
        toast.success("✅ Product updated successfully!");
      } else {
        await postProductApi(values);
        toast.success("✅ Product created successfully!");
      }

      router.push("/products");
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("[PRODUCT_FORM_ERROR]", err);
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Something went wrong, please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-5 md:px-24">
      <div className="flex items-center justify-between">
        <p className="title-page text-xl font-semibold">
          {initialData ? "Edit Product" : "Create Product"}
        </p>
      </div>

      <Separator className="mt-4 mb-7" />

      <div className="max-w-[600px] lg:max-w-[900px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert title..."
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insert description..."
                      {...field}
                      rows={4}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Rp)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insert price..."
                      // Kalau null/undefined → tampilkan string kosong
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '') {
                          field.onChange(undefined); // kosong → undefined (biar zod validasi)
                        } else {
                          const n = Number(v);
                          if (!Number.isNaN(n)) {
                            field.onChange(n);
                          }
                        }
                      }}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Collection Select */}
            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading || collections.length === 0}
                    >
                      <SelectTrigger className="w-[400px]">
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                      <SelectContent>
                        {collections.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sizes Input Multiple */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagInput
                      label="Sizes"
                      values={field.value || []}
                      onChange={field.onChange}
                      placeholder="Press Enter to add size..."
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Colors Input Multiple */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagInput
                      label="Colors"
                      values={field.value || []}
                      onChange={field.onChange}
                      placeholder="Press Enter to add color..."
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags Input Multiple */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagInput
                      label="tags"
                      values={field.value || []}
                      onChange={field.onChange}
                      placeholder="Press Enter to add color..."
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <UploadImageComponent
                      value={field.value || []}
                      onChange={(urls) => field.onChange(urls)}
                      onRemove={(url) =>
                        field.onChange(
                          (field.value || []).filter((item: string) => item !== url)
                        )
                      }
                      multiple
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/products")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : initialData
                  ? "Update Product"
                  : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
