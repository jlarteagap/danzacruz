import React from "react";
import { ErrorMessage, Field, useField } from "formik";

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='mb-5'>
      <label className='block mb-2 font-semibold'>{label}</label>
      <input
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-pink-500 block w-full ps-10 p-2 ${
          meta.touched && meta.error && "border-red-500"
        }`}
        {...field}
        {...props}
        autoComplete='off'
      />
      <ErrorMessage
        component='div'
        name={field.name}
        className='text-sm'
        style={{ color: "red" }}
      />
    </div>
  );
};

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className=''>
      <div className='mb-5'>
        <label className='block mb-2 font-semibold'>{label}</label>
        <select
          {...field}
          {...props}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${
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
        <ErrorMessage component='div' name={field.name} className='text-sm' />
      </div>
    </div>
  );
};

export const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className=''>
      <div className={``}>
        <label className='font-semibold'>{label}</label>
        <textarea
          className={`${meta.touched && meta.error && ""}`}
          placeholder='Agregar descripcion'
          {...field}
          {...props}
        ></textarea>
        <ErrorMessage component='div' name={field.name} className='' />
      </div>
    </div>
  );
};

export const ButtonField = ({ type, addText }) => {
  return (
    <button
      type={type}
      className='bg-slate-900 text-white rounded-md p-2 hover:bg-slate-400 focus:ring-4 hover:text-slate-700 focus:ring-blue-300'
    >
      {addText}
    </button>
  );
};

export const RadioFields = ({ options, name }) => {
  return (
    <div className='block mb-5'>
      {options.map((option, i) => {
        return (
          <label className='flex items-center' key={i}>
            <Field type='radio' name={name} value={option} />
            <span className='ml-3 block text-sm font-medium text-gray-900'>
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export const InputFile = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='file'>
      <label className='file-label'>
        <input
          className={`file-input ${meta.touched && meta.error && "is-danger"}`}
          {...props}
        />
        <span className='file-cta'>
          <span className='file-label'>Subir logo...</span>
        </span>
      </label>
      <ErrorMessage
        component='div'
        name={field.name}
        className='is-flex help is-danger'
      />
    </div>
  );
};
