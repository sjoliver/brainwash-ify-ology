import React, { useState } from 'react'

export default function InputForm(props) {
  const { localUser, field } = props;
  const [value, setValue] = useState("");

  return (
      <input      
        name={field} 
        type="text" 
        placeholder={localUser[field]}
        value={value}
        onChange={event => setValue(() => event.target.value)}
      />
  )
}