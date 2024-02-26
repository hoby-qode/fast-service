import React from 'react'

const Input = ({ label, id, icon, ...props }) => {
  return (
    <>
      <input {...props} id={id} />
      <label htmlFor={id}>
        {icon}
        {label}
      </label>
    </>
  )
}

export { Input }
