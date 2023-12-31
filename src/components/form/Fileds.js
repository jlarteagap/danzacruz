import React from 'react'
import { ErrorMessage, Field, useField } from 'formik'

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="field">
      <div className="control">
        <label className="label">{label}</label>
        <input
          className={`input ${meta.touched && meta.error && 'is-danger'}`}
          {...field}
          {...props}
          autoComplete="off"
        />
        <ErrorMessage
          component="div"
          name={field.name}
          className="help is-danger"
        />
      </div>
    </div>
  )
}

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="field">
      <div className="control">
        <label className="label">{label}</label>
        <div className="select is-fullwidth">
          <select
            {...field}
            {...props}
            className={`${meta.touched && meta.error && 'is-danger'}`}
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
        </div>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="help is-danger"
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

export const ButtonField = ({ type, addText, classType }) => {
  return (
    <button type={type} className={`button ${classType}`}>
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
    <div className="file">
      <label className="file-label">
        <input
          className={`file-input ${meta.touched && meta.error && 'is-danger'}`}
          {...props}
        />
        <span className="file-cta">
          <span className="file-label">Subir logo...</span>
        </span>
      </label>
      <ErrorMessage
        component="div"
        name={field.name}
        className="is-flex help is-danger"
      />
    </div>
  )
}
