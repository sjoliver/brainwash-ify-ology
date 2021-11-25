import React from 'react'

export default function InputForm(props) {
  const { placeholder } = props;
  const { edit, setEdit, field } = props;

  return (
      <input      
        name={field} 
        type="text" 
        placeholder={placeholder}
        value={edit[field]}
        onChange={event => setEdit(prev => {
          if (!event.target.value) {
            delete prev[field];
          }

          let change = {
            ...prev,
          }

          if (event.target.value) {
            change[field] = event.target.value;
          }

          return change;
        })}
      />
  )
}