'use client'

import React from 'react'
import { ErrorMessage, Field, useField } from 'formik'

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="mb-4">
      <label className="my-3">{label}</label>
      <input
        className={`block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ${meta.touched && meta.error && ''}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-xs text-red-700"
      />
    </div>
  )
}

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="mb-4">
      <label className="py-3">{label}</label>
      <select
        {...field}
        {...props}
        className={`block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ${meta.touched && meta.error && ''}`}
      >
        <option defaultValue="" value="" label="--">
          - -
        </option>
        {options.map((option, index) => {
          return (
            <option value={option.value} label={option.name} key={index}>
              {option.value}
            </option>
          )
        })}
      </select>

      <ErrorMessage
        component="div"
        name={field.name}
        className="text-xs text-red-700 py-3"
      />
    </div>
  )
}

export const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="field">
      <div className={`control`}>
        <label className="label">{label}</label>
        <textarea
          className={`textarea ${meta.touched && meta.error && 'is-danger'}`}
          placeholder="Agregar descripcion"
          {...field}
          {...props}
        ></textarea>
        <ErrorMessage
          component="div"
          name={field.name}
          className="help is-danger"
        />
      </div>
    </div>
  )
}

export const ButtonField = ({ type, addText }) => {
  return (
    <button
      type={type}
      class={` bg-black text-white font-bold py-2 px-4 rounded`}
    >
      {addText}
    </button>
  )
}

export const RadioFields = ({ options, name }) => {
  return (
    <div className="control">
      {options.map((option, i) => {
        return (
          <label className="dc__label" key={i}>
            <Field type="radio" name={name} value={option} />
            <span className="dc__radio__label">{option}</span>
          </label>
        )
      })}
    </div>
  )
}

export const InputFile = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-3">
      <label className="file-label">
        <input
          className={`w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded ${meta.touched && meta.error && 'is-danger'}`}
          {...props}
        />
      </label>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-xs text-red-700 py-3"
      />
    </div>
  )
}
