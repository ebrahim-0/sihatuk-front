import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkClass, cn } from "@/lib/utils";

interface FloatLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FloatLabel = React.forwardRef<HTMLInputElement, FloatLabelProps>(
  ({ label, name, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref} // Forward the ref to the Input component
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className={cn("pt-4", className)}
        />
        <Label
          htmlFor={name}
          className={cn(
            "absolute rtl:right-2 ltr:left-2 bg-background px-1",
            "transition-all duration-200 pointer-events-none",
            checkClass(isFocused || hasValue, [
              "-top-3 text-sm",
              "top-2 w-1/2",
            ]),
            checkClass(isFocused, ["text-primary", "text-muted-foreground"])
          )}
          onClick={() => document.getElementById(name)?.focus()}
        >
          {label}
        </Label>
      </div>
    );
  }
);

FloatLabel.displayName = "FloatLabel"; // Helpful for debugging
