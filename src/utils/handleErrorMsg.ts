import { TFunction } from "i18next";

// Define a type for the message object
interface ErrorMessage {
  key: string;
  values?: Record<string, string | number | boolean | null>;
}

// Define a type for the error object
interface ErrorObject {
  type?: string;
  message?: string | ErrorMessage;
}

export default function handleErrorMsg(
  error: ErrorObject,
  t: TFunction
): string | null {
  let errMsg: string | null = null;

  if (typeof error === "object" && error !== null) {
    const { type, message } = error;

    if (type === "serverSideError") {
      errMsg = message as string;
    } else if (
      message &&
      typeof message === "object" &&
      (message as ErrorMessage).key
    ) {
      const errorMessage = message as ErrorMessage;

      // Translate based on key and values
      const translatedMessage = t(
        `validation.${errorMessage.key}`,
        errorMessage.values
      );

      // Check if t() returns a string
      if (typeof translatedMessage === "string") {
        errMsg = translatedMessage;
      } else {
        // Fallback to key if translation doesn't exist
        errMsg = t(`validation.${errorMessage.key}`) || errorMessage.key;
      }
    } else if (typeof message === "string") {
      // Handle if message is a string
      errMsg = t(`validation.${message}`) || message;
    }
  }

  // Return error message as string or null
  return typeof errMsg === "string" ? errMsg : null;
}
