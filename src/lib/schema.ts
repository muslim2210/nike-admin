import z from "zod";

// 🔹 Schema validasi
export const formSchemaCollection = z.object({
  title: z.string().min(3, "Minimal 3 karakter").max(100),
  description: z.string().min(5, "Minimal 5 karakter").max(1000).trim(),
  image: z.string().min(3, "image is required"),
});

export const formSchemaProduct = z.object({
  title: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter")
    .trim(),
  description: z
    .string()
    .min(5, "Minimal 5 karakter")
    .max(1000, "Maksimal 1000 karakter")
    .trim(),
  price: z.number().min(1, "Harga tidak boleh kosong"),
  media: z.array(z.string().url("URL media tidak valid")).optional(),
  sizes: z.array(z.string().min(1, "Ukuran tidak boleh kosong")).optional(),
  tags: z.array(z.string()).optional(),
  colors: z.array(z.string().min(1, "Warna tidak boleh kosong")).optional(),
  collectionId: z.string().min(1, "Collection wajib dipilih"),
});

export type ProductFormType = z.infer<typeof formSchemaProduct>;
