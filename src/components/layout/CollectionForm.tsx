"use client";
import { z } from "zod";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { CollectionType } from "@/types/model";
import UploadImageComponent from "../custom/UploadImageComponent";
import { useCollectionApi } from "@/hooks/useCollectionApi";

// 🔹 Schema validasi
const formSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter").max(100),
  description: z.string().min(5, "Minimal 5 karakter").max(1000).trim(),
  image: z.string().min(3, "image is required"),
});

// 🔹 Tipe props
interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { createCollectionApi, updateCollectionApi } = useCollectionApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
    },
  });

  // 🔹 Submit handler untuk Create / Update
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // 🔹 Tentukan mode create / update
      if (initialData) {
        await updateCollectionApi(initialData.id, values);
        toast.success("Collection updated successfully!");
      } else {
        await createCollectionApi(values);
        toast.success("Collection created successfully!");
      }

      router.push("/collections");
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("[COLLECTION_FORM_ERROR]", err);

      // 🔹 Tangkap pesan error dari server (kalau ada)
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong, please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cegah submit form dengan Enter
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="py-12 px-5 md:px-24">
      {/* Header */}
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="title-page">
            Edit Collection
          </p>
        </div>
      ) : (
        <p className="title-page">
          Create Collection
        </p>
      )}

      <Separator className="bg-primaryBlack mt-4 mb-7" />

      {/* Form */}
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
                      onKeyDown={handleKeyPress}
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
                      rows={5}
                      onKeyDown={handleKeyPress}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
           <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImageComponent
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)} // kirim string
                      onRemove={() => field.onChange("")}
                      multiple={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/collections")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : initialData
                  ? "Update Collection"
                  : "Create Collection"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CollectionForm;
