import React from "react";
import { ErrorMessage, Field, useField } from "formik";

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      {/* Label */}
      <label className='block text-sm font-medium text-gray-900 mb-3 text-left'>
        {label}
      </label>

      {/* Input Element */}
      <input
        className={`
          w-full px-4 py-3.5 text-base text-gray-900 placeholder-gray-500
          bg-white border-2 rounded-2xl
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-0
          hover:border-gray-300
          ${
            meta.touched && meta.error
              ? "border-red-300 focus:border-red-400 bg-red-50/30"
              : "border-gray-200 focus:border-blue-400 focus:bg-blue-50/20"
          }
          shadow-sm hover:shadow-md focus:shadow-md
          backdrop-blur-sm
        `}
        {...field}
        {...props}
        value={field.value || ""} // Asegurar que nunca sea undefined
      />

      {/* Error Message */}
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm text-red-600 mt-2 font-medium px-1'
      />
    </div>
  );
};

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      {/* Label */}
      <label className='block text-sm font-medium text-gray-900 mb-3 text-left'>
        {label}
      </label>

      {/* Select Element */}
      <div className='relative'>
        <select
          {...field}
          {...props}
          className={`
            w-full px-4 py-3.5 text-base text-gray-900
            bg-white border-2 rounded-2xl
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-0
            hover:border-gray-300
            appearance-none cursor-pointer
            ${
              meta.touched && meta.error
                ? "border-red-300 focus:border-red-400 bg-red-50/30"
                : "border-gray-200 focus:border-blue-400 focus:bg-blue-50/20"
            }
            shadow-sm hover:shadow-md focus:shadow-md
            backdrop-blur-sm
            pr-12
          `}
        >
          <option value='' disabled>
            Seleccionar opción...
          </option>
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.name}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm text-red-600 mt-2 font-medium px-1'
      />
    </div>
  );
};

export const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      {/* Label */}
      <label className='block text-sm font-medium text-gray-900 mb-3 text-left'>
        {label}
      </label>

      {/* Textarea Element */}
      <textarea
        className={`
          w-full px-4 py-3.5 text-base text-gray-900 placeholder-gray-500
          bg-white border-2 rounded-2xl
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-0
          hover:border-gray-300
          resize-y min-h-[120px]
          ${
            meta.touched && meta.error
              ? "border-red-300 focus:border-red-400 bg-red-50/30"
              : "border-gray-200 focus:border-blue-400 focus:bg-blue-50/20"
          }
          shadow-sm hover:shadow-md focus:shadow-md
          backdrop-blur-sm
        `}
        placeholder='Ingresa tu texto aquí...'
        {...field}
        {...props}
      />

      {/* Error Message */}
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm text-red-600 mt-2 font-medium px-1'
      />
    </div>
  );
};

export const ButtonField = ({
  type = "button",
  addText,
  variant = "primary",
  size = "default",
  isLoading = false,
  loadingText = "Cargando...",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-2xl transition-all duration-200 ease-out focus:outline-none focus:ring-4 active:scale-95 shadow-sm hover:shadow-md backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-300 border-2 border-blue-600 hover:border-blue-700 disabled:hover:bg-blue-600 disabled:hover:border-blue-600",
    secondary:
      "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 focus:ring-gray-300 border-2 border-gray-200 hover:border-gray-300 disabled:hover:bg-gray-100 disabled:hover:border-gray-200",
    danger:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-300 border-2 border-red-600 hover:border-red-700 disabled:hover:bg-red-600 disabled:hover:border-red-600",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className='flex items-center justify-center gap-2'>
        {isLoading && (
          <svg
            className='animate-spin h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {isLoading ? loadingText : addText}
      </span>
    </button>
  );
};

export const RadioFields = ({ options, name, label }) => {
  return (
    <div className='mb-3'>
      {/* Label */}
      {label && (
        <label className='block text-sm font-medium text-gray-900 mb-3 text-left'>
          {label}
        </label>
      )}

      {/* Radio Elements */}
      <div className='space-y-3'>
        {options.map((option, i) => (
          <label key={i} className='flex items-center group cursor-pointer'>
            <div className='relative'>
              <Field
                type='radio'
                name={name}
                value={option}
                className='sr-only peer'
              />
              <div
                className='
                w-5 h-5 rounded-full border-2 border-gray-300
                peer-checked:border-blue-600 peer-checked:bg-blue-600
                peer-focus:ring-4 peer-focus:ring-blue-300
                transition-all duration-200 ease-out
                group-hover:border-blue-400
                flex items-center justify-center
              '
              >
                <div
                  className='
                  w-2 h-2 rounded-full bg-white
                  opacity-0 peer-checked:opacity-100
                  transition-opacity duration-200 ease-out
                '
                ></div>
              </div>
            </div>
            <span className='ml-3 text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-150'>
              {option}
            </span>
          </label>
        ))}
      </div>

      {/* Error Message - Note: Radio groups typically use a single error for the group */}
    </div>
  );
};

export const InputFile = ({ label = "Subir archivo", ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      {/* Label */}
      {label && (
        <label className='block text-sm font-medium text-gray-900 mb-3 text-left'>
          {label}
        </label>
      )}

      {/* File Input Element */}
      <div className='relative'>
        <input
          type='file'
          className='sr-only peer'
          id={props.name}
          {...props}
        />
        <label
          htmlFor={props.name}
          className={`
            flex flex-col items-center justify-center
            w-full h-32 px-4 py-6
            border-2 border-dashed rounded-2xl
            cursor-pointer
            transition-all duration-200 ease-out
            hover:bg-gray-50 focus-within:bg-gray-50
            group
            ${
              meta.touched && meta.error
                ? "border-red-300 bg-red-50/30"
                : "border-gray-300 hover:border-blue-400 focus-within:border-blue-400"
            }
            shadow-sm hover:shadow-md
          `}
        >
          <div className='flex flex-col items-center justify-center space-y-2'>
            <svg
              className='w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-150'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-150'>
              <span className='font-semibold'>Click para subir</span> o arrastra
              y suelta
            </p>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF hasta 10MB</p>
          </div>
        </label>
      </div>

      {/* Error Message */}
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm text-red-600 mt-2 font-medium px-1'
      />
    </div>
  );
};

export const CheckboxField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      <label className='flex items-center group cursor-pointer text-left'>
        <div className='relative'>
          <input
            type='checkbox'
            className='sr-only peer'
            {...field}
            {...props}
          />
          <div
            className='
            w-5 h-5 rounded-md border-2 border-gray-300
            peer-checked:border-blue-600 peer-checked:bg-blue-600
            peer-focus:ring-4 peer-focus:ring-blue-300
            transition-all duration-200 ease-out
            group-hover:border-blue-400
            flex items-center justify-center
          '
          >
            <svg
              className='w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ease-out'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <span className='ml-3 text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-150'>
          {label}
        </span>
      </label>
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm text-red-600 mt-2 font-medium px-1'
      />
    </div>
  );
};
