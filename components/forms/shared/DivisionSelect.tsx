import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIVISION_OPTIONS } from "@/services/api/choreography.service";

interface DivisionSelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  categoryValue: string;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export const DivisionSelect = ({
  name,
  value,
  onValueChange,
  categoryValue,
  disabled = false,
  error = false,
  placeholder = "Selecciona una división",
}: DivisionSelectProps) => {
  const divisions = categoryValue ? DIVISION_OPTIONS[categoryValue] || [] : [];

  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <Select
          value={value || field.value}
          onValueChange={(val) => {
            form.setFieldValue(name, val);
            onValueChange?.(val);
          }}
          disabled={disabled || !categoryValue}
        >
          <SelectTrigger className={`w-full ${error ? "border-red-400" : ""}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {divisions.length > 0 ? (
              divisions.map((div: any) => (
                <SelectItem key={div.value} value={div.value}>
                  {div.name}
                </SelectItem>
              ))
            ) : (
              <div className='p-3 text-gray-500 text-sm'>
                Selecciona una categoría primero
              </div>
            )}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};
