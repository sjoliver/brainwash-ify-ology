import React, { useState } from 'react'

export default function InputForm(props) {
  const { localUser,  } = props;
  const [value, setValue] = useState("");

  return (
      <input      
        name="username" 
        type="text" 
        placeholder={localUser.username}
        value={value}
        onChange={setValue(() => event.target.value)}
      />
  )
}