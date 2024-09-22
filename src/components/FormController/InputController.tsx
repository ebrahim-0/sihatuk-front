import { Control, Path, FieldValues, PathValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputControllerProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  type: string;
}
const InputController = <T extends FieldValues>({
  control,
  label,
  name,
  type,
  defaultValue,
}: InputControllerProps<T>) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field: { value, ref, ...otherProps } }) => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  ref={ref}
                  value={value}
                  {...otherProps}
                  name={name}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputController;
