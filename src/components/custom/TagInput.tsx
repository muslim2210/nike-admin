'use client'
import { useState } from "react";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const TagInput = ({
  label,
  values,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  values: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!values.includes(inputValue.trim())) {
        onChange([...values, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((t) => t !== tag));
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="flex flex-wrap border gap-2 rounded-md mt-2">
        {values.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-4"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
        <Input
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none outline-none bg-transparent min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default TagInput;