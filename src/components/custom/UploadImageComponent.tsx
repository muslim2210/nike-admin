"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  onRemove?: (url: string) => void;
  multiple?: boolean;
}

const UploadImageComponent: React.FC<ImageUploadProps> = ({
  value = "",
  onChange,
  onRemove,
  multiple = false,
}) => {
  const values = Array.isArray(value)
    ? value
    : value
    ? [value]
    : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    console.log("[UPLOAD_RESULT]", result); // ✅ lihat hasil di console
    const newUrl = result?.info?.secure_url;

    if (!newUrl) {
      console.error("[UPLOAD_ERROR] secure_url tidak ditemukan:", result);
      return;
    }

    if (multiple) {
      onChange([...values, newUrl]);
    } else {
      onChange(newUrl);
    }
  };

  const handleRemove = (url: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((item) => item !== url));
    } else {
      onChange("");
    }
    if (onRemove) onRemove(url);
  };

  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Upload Foto
      </label>

      <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-300 px-6 py-8">
        {values.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {values.map((url) => (
              <div
                key={url}
                className="relative w-[220px] h-[130px] bg-gray-50 rounded-lg overflow-hidden border"
              >
                <div className="absolute right-1 top-1 z-10">
                  <Button
                    type="button"
                    onClick={() => handleRemove(url)}
                    className="bg-red-500 text-white hover:bg-red-600"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  src={url}
                  alt="preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            sources: ["local", "camera"],
            multiple,
            maxFileSize: 2_000_000,
          }}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className="text-white py-2 bg-black px-4 rounded-full flex items-center justify-center mx-auto hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload {multiple ? "Images" : "Image"}
            </button>
          )}
        </CldUploadWidget>

        <p className="text-xs leading-5 mt-4 text-gray-600 text-center">
          PNG, JPG, JPEG up to 2MB
        </p>
      </div>
    </div>
  );
};

export default UploadImageComponent;
