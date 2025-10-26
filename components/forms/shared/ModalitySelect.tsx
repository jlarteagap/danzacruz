"use client";

import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODALITIES } from "@/services/api/choreography.service";

interface ModalitySelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export const ModalitySelect = ({
  name,
  value,
  onValueChange,
  disabled = false,
  error = false,
  placeholder = "Selecciona modalidad",
}: ModalitySelectProps) => {
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
            {MODALITIES.map((mod) => (
              <SelectItem key={mod.value} value={mod.value}>
                {mod.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};
