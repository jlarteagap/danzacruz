"use client";

import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBDIVISION_OPTIONS } from "@/services/api/choreography.service";

interface SubdivisionSelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export const SubdivisionSelect = ({
  name,
  value,
  onValueChange,
  disabled = false,
  error = false,
  placeholder = "Selecciona una subdivisión",
}: SubdivisionSelectProps) => {
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
            {SUBDIVISION_OPTIONS.map((sub) => (
              <SelectItem key={sub.value} value={sub.value}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};
