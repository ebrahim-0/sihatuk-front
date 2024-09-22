import { Control, FieldValues, Path } from "react-hook-form";
import useLang from "@/hooks/useLang";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Option {
  value: string;
  label: string;
}

interface SelectControllerProps<T extends FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  options: Option[];
}

const SelectController = <T extends FieldValues>({
  control,
  label,
  name,
  options,
}: SelectControllerProps<T>) => {
  const { t, lang } = useLang();

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field: { value, ref, ...reset } }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select
                onValueChange={reset.onChange}
                dir={lang === "en" ? "ltr" : "rtl"}
              >
                <SelectTrigger value={value}>
                  <SelectValue placeholder={t("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} ref={ref} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SelectController;
