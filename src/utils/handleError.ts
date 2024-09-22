/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

export const handleError = (errors: any, setError: UseFormSetError<any>) => {
  console.log("🚀 ~ handleError ~ errors:", errors);

  const errorResponse = errors.response.data;
  console.log("🚀 ~ handleError ~ errorResponse:", errorResponse);

  if (errorResponse.errors) {
    const allErrors = errorResponse.errors;
    for (const key in allErrors) {
      if (Object.prototype.hasOwnProperty.call(allErrors, key)) {
        console.log("🚀 ~ handleError ~ key:", key);
        setError(allErrors[key].key, {
          type: "custom",
          message: allErrors[key].value[0],
        });
      }
    }
  } else if (errorResponse.message) {
    toast.error(errorResponse.message);

    console.log(
      "🚀 ~ handleError ~ errorResponse.message:",
      errorResponse.message
    );
  }

  return;
};
