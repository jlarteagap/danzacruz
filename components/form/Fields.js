"use client";

import React from "react";
import { ErrorMessage, Field, useField } from "formik";

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-4'>
      <label className='my-3'>{label}</label>
      <input
        className={`block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ${
          meta.touched && meta.error && ""
        }`}
        {...field}
        {...props}
        autoComplete='off'
      />
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-xs text-red-700'
      />
    </div>
  );
};

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-4'>
      <label className='py-3'>{label}</label>
      <select
        {...field}
        {...props}
        className={`block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ${
          meta.touched && meta.error && ""
        }`}
      >
        <option defaultValue='' value='' label='--'>
          - -
        </option>
        {options.map((option, index) => {
          return (
            <option value={option.value} label={option.name} key={index}>
              {option.value}
            </option>
          );
        })}
      </select>

      <ErrorMessage
        component='div'
        name={field.name}
        className='text-xs text-red-700 py-3'
      />
    </div>
  );
};

export const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='field'>
      <div className={`control`}>
        <label className='label'>{label}</label>
        <textarea
          className={`textarea ${meta.touched && meta.error && "is-danger"}`}
          placeholder='Agregar descripcion'
          {...field}
          {...props}
        ></textarea>
        <ErrorMessage
          component='div'
          name={field.name}
          className='help is-danger'
        />
      </div>
    </div>
  );
};

export const ButtonField = ({ type, addText }) => {
  return (
    <button
      type={type}
      class={` bg-black text-white font-bold py-2 px-4 rounded`}
    >
      {addText}
    </button>
  );
};

export const RadioFields = ({ options, name }) => {
  return (
    <div className='control'>
      {options.map((option, i) => {
        return (
          <label className='dc__label' key={i}>
            <Field type='radio' name={name} value={option} />
            <span className='dc__radio__label'>{option}</span>
          </label>
        );
      })}
    </div>
  );
};

export const ImageUploadField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='mb-3'>
      <label className='file-label cursor-pointer'>
        <div
          className={`
          w-32 h-32 
          border-2 border-dashed border-gray-300 
          rounded-lg 
          flex flex-col items-center justify-center 
          bg-gray-50 
          hover:bg-gray-100 
          transition-colors duration-200
          ${
            meta.touched && meta.error
              ? "border-red-500 bg-red-50"
              : "hover:border-gray-400"
          }
        `}
        >
          {/* Icono de carga */}
          <svg
            className='w-8 h-8 text-gray-400 mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>

          {/* Texto */}
          <span className='text-sm text-gray-500 text-center'>
            Subir imagen
          </span>
        </div>

        {/* Input file oculto */}
        <input
          type='file'
          accept='image/*'
          className='hidden'
          {...field}
          {...props}
        />
      </label>
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-xs text-red-700 py-3'
      />
    </div>
  );
};
