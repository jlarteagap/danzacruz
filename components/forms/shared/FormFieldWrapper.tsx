"use client";

import { Label } from "@/components/ui/label";
import type { ReactNode } from "react";

interface FormFieldWrapperProps {
  name: string;
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const FormFieldWrapper = ({
  name,
  label,
  error,
  touched,
  required,
  description,
  icon,
  children,
}: FormFieldWrapperProps) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor={name}
        className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
      >
        {icon}
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </Label>
      {children}
      {description && !error && (
        <p className='text-xs text-apple-gray-500'>{description}</p>
      )}
      {error && touched && (
        <p className='text-xs font-medium text-red-600 flex items-center gap-1'>
          <span className='inline-block w-1 h-1 rounded-full bg-red-600' />
          {error}
        </p>
      )}
    </div>
  );
};
