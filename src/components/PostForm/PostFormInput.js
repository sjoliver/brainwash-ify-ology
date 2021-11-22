import React from 'react'

export default function PostFormInput(props) {
  const { name, type, placeholder, postState, onChange} = props;

  return (
    <input
      name={name} 
      type={type} 
      placeholder={placeholder}
      value={postState}
      onChange={onChange}
    />
  )
}