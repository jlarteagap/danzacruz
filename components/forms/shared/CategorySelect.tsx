import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_OPTIONS } from "@/services/api/choreography.service";

interface CategorySelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export const CategorySelect = ({
  name,
  value,
  onValueChange,
  disabled = false,
  error = false,
  placeholder = "Selecciona una categoría",
}: CategorySelectProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <Select
          value={value || field.value}
          onValueChange={(val) => {
            form.setFieldValue(name, val);
            onValueChange?.(val);
          }}
          disabled={disabled}
        >
          <SelectTrigger className={`w-full ${error ? "border-red-400" : ""}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};
