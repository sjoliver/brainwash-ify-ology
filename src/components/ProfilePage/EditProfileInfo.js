import React, { useState } from 'react'
import InputForm from './InputForm';

export default function EditProfileInfo(props) {
  const { localUser } = props;
  const [edit, setEdit] = useState({});

  const editUser = function() {
    console.log("clicked");
  }

  return (
    <form onSubmit={event => event.preventDefault()}>
      <InputForm localUser={localUser} field={"username"}/>
      <button onClick={editUser}>Submit</button>
    </form>
  )
}