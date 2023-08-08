import React from 'react'
import { ErrorMessage, useField } from 'formik'

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
      <div className="select is-fullwidth">
        <label className="label">{label}</label>
        <select
          {...field}
          {...props}
          className={`${meta.touched && meta.error && 'is-danger'}`}
        >
          {options.map((option, index) => {
            return (
              <option value={option.value} label={option.name} key={index}>
                {option.text}
              </option>
            )
          })}
        </select>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="help is-danger"
      />
    </div>
  )
}

export const checkedField = () => {
  return 'Checbox'
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

export const buttonField = () => {
  return 'Button'
}
