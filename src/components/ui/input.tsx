/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const handleIncrease = () => {
      if (typeof value === "number" || typeof value === "string") {
        const newValue = parseFloat(value as string) + 1;
        onChange?.({ target: { value: newValue.toString() } } as any);
      }
    };

    // Handle value decrement
    const handleDecrease = () => {
      if (typeof value === "number" || typeof value === "string") {
        const newValue = parseFloat(value as string) - 1;
        onChange?.({ target: { value: newValue.toString() } } as any);
      }
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent",
            "px-3 py-2 text-sm shadow-sm transition-colors file:border-0",
            "file:bg-transparent file:text-sm file:font-medium",
            "file:text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:border-ring",
            "focus-visible:ring-ring disabled:cursor-not-allowed",
            "disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
        {type === "number" && (
          <div
            className={cn(
              "flex justify-end items-center gap-x-1.5",
              "absolute top-0 ltr:right-1 rtl:left-1 bottom-0 px-2"
            )}
          >
            <button
              type="button"
              className="size-5 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-input bg-background shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              tabIndex={-1}
              onClick={handleDecrease}
              aria-label="Decrease"
              data-hs-input-number-decrement=""
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
            </button>
            <button
              type="button"
              className="size-5 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-input bg-background shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              tabIndex={-1}
              onClick={handleIncrease}
              aria-label="Increase"
              data-hs-input-number-increment=""
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
