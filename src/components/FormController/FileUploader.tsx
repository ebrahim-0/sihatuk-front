import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { useRef, useState } from "react";
import FileInput from "./FileInput";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FileUploaderProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
}

const FileUploader = <T extends FieldValues>({
  control,
  label,
  name,
}: FileUploaderProps<T>) => {
  const [files, setFiles] = useState<File[]>([]);

  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesChange = (
    newFiles: File[],
    field: ControllerRenderProps<T, Path<T>>
  ) => {
    // Merge new files with the current list of files
    const updatedFiles = [...files, ...newFiles];

    // Remove duplicate files based on their names and sizes
    const uniqueFiles = Array.from(
      new Map(
        updatedFiles.map((file) => [file.name + file.size, file])
      ).values()
    );

    setFiles(uniqueFiles);

    // Update previews
    const newPreviews = uniqueFiles.map((file) => {
      return {
        url: URL.createObjectURL(file),
        type: file.type,
      };
    });

    setPreviews(newPreviews);

    field.onChange(uniqueFiles);
  };

  const handleFileRemove = (
    index: number,
    field: ControllerRenderProps<T, Path<T>>
  ) => {
    // Remove the file from the list
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Update previews
    const updatedPreviews = updatedFiles.map((file) => {
      return {
        url: URL.createObjectURL(file),
        type: file.type,
      };
    });
    setPreviews(updatedPreviews);

    // Update field value
    field.onChange(updatedFiles);
  };

  const handlePreviewInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mb-6">
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <div className="relative">
                <FileInput
                  field={field}
                  onChange={handleFilesChange}
                  inputRef={fileInputRef}
                />
              </div>
            </FormControl>

            <FormDescription>
              {previews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {previews.map((preview, index) => {
                    const Comp = preview.type.includes("image")
                      ? "img"
                      : "embed";
                    return (
                      <div
                        key={index}
                        className="relative w-full md:w-[216px] h-auto"
                      >
                        <Comp
                          src={preview.url}
                          alt={`File Preview ${index + 1}`}
                          className="w-full h-48 object-contain p-2 border rounded-lg"
                        />
                        <div className="absolute top-2 right-4 flex gap-3 flex-row-reverse">
                          <button
                            type="button"
                            onClick={() => handleFileRemove(index, field)}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <svg
                              className="w-5 h-5 text-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePreviewInNewTab(preview.url)}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Preview in New Tab"
                          >
                            <svg
                              className="w-5 h-5 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M14 2a1 1 0 00-1 1v2a1 1 0 102 0V4h2.586l-4.293 4.293a1 1 0 001.414 1.414L20 5.414V8a1 1 0 102 0V3a1 1 0 00-1-1h-5z" />
                              <path d="M11 5a1 1 0 00-1 1v2a1 1 0 102 0V7h2.586l-4.293 4.293a1 1 0 001.414 1.414L16 8.414V11a1 1 0 102 0V6a1 1 0 00-1-1h-5z" />
                              <path
                                fillRule="evenodd"
                                d="M5 4a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3v-2a1 1 0 112 0v2a5 5 0 01-5 5H5a5 5 0 01-5-5V7a5 5 0 015-5h2a1 1 0 110 2H5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />
      {/* <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className="relative">
              <FileInput
                field={field}
                onChange={handleFilesChange}
                inputRef={fileInputRef}
                error={!!error}
              />

              {previews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {previews.map((preview, index) => {
                    const Comp = preview.type.includes("image")
                      ? "img"
                      : "embed";
                    return (
                      <div
                        key={index}
                        className="relative w-full md:w-[216px] h-auto"
                      >
                        <Comp
                          src={preview.url}
                          alt={`File Preview ${index + 1}`}
                          className="w-full h-48 object-contain p-2 border rounded-lg"
                        />
                        <div className="absolute top-2 right-4 flex gap-3 flex-row-reverse">
                          <button
                            type="button"
                            onClick={() => handleFileRemove(index, field)}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <svg
                              className="w-5 h-5 text-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePreviewInNewTab(preview.url)}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Preview in New Tab"
                          >
                            <svg
                              className="w-5 h-5 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M14 2a1 1 0 00-1 1v2a1 1 0 102 0V4h2.586l-4.293 4.293a1 1 0 001.414 1.414L20 5.414V8a1 1 0 102 0V3a1 1 0 00-1-1h-5z" />
                              <path d="M11 5a1 1 0 00-1 1v2a1 1 0 102 0V7h2.586l-4.293 4.293a1 1 0 001.414 1.414L16 8.414V11a1 1 0 102 0V6a1 1 0 00-1-1h-5z" />
                              <path
                                fillRule="evenodd"
                                d="M5 4a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3v-2a1 1 0 112 0v2a5 5 0 01-5 5H5a5 5 0 01-5-5V7a5 5 0 015-5h2a1 1 0 110 2H5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {error && (
                <p className="text-red-600 text-xs mt-1 font-medium">
                  {handleErrorMsg(error, t)}
                </p>
              )}
            </div>
          );
        }}
      /> */}
    </div>
  );
};

export default FileUploader;
