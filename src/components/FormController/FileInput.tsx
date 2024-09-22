import { useFormField } from "@/components/ui/form";
import { checkClass, cn } from "@/lib/utils";
import React, { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface FileInputProps<T extends FieldValues> {
  onChange: (newFile: File[], field: ControllerRenderProps<T, Path<T>>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  field: ControllerRenderProps<T, Path<T>>;
}

const FileInput = <T extends FieldValues>({
  onChange,
  inputRef,
  field,
}: FileInputProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange(files, field);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onChange(files, field);
  };

  const { error } = useFormField();


  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex items-center justify-center w-full"
      role="region"
      aria-label="file upload area"
      aria-describedby={error ? "file-error" : undefined}
    >
      <label
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        htmlFor="dropzone-file"
        className={cn(
          "flex flex-col items-center justify-center",
          "w-full h-25 border-2 border-dashed rounded-lg cursor-pointer",
          "bg-background hover:border-blue-500 hover:bg-blue-50",
          "dark:hover:border-blue-500 dark:hover:bg-white/5 focus:bg-blue-50",
          "focus:outline-none focus:border-blue-500 dark:focus:bg-white/5",
          checkClass(isDragging, ["border-blue-500", "border-gray-300"]),
          error && "!border-red-500 !bg-red-50 dark:!bg-red-950"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-50"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-50">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-50">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          ref={inputRef}
          onChange={inputChange}
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );

  return (
    <input
      type="file"
      ref={inputRef}
      onChange={inputChange}
      multiple
      className={`block w-full text-sm text-gray-900 border rounded-lg cursor-pointer file:border file:border-gray-300 file:bg-gray-50 file:rounded-lg file:py-2 file:px-4 file:text-sm file:font-medium file:text-gray-700 file:transition file:duration-150 file:ease-in-out hover:file:bg-gray-100 focus:file:outline-none ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-indigo-500"
      }`}
      aria-invalid={error ? "true" : "false"}
    />
  );
};

export default FileInput;
