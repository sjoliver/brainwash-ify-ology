import React, { useState } from 'react'
import InputForm from './InputForm';

export default function EditProfileInfo(props) {
  const { localUser } = props;
  const [edit, setEdit] = useState({});

  const editUser = function() {
    console.log(edit);
  }

  return (
    <form onSubmit={event => event.preventDefault()}>
      <InputForm edit={edit} setEdit={setEdit} field={"username"} placeholder={localUser.username}/>
      <InputForm edit={edit} setEdit={setEdit} field={"bio"} placeholder={localUser.bio}/>
      <InputForm edit={edit} setEdit={setEdit} field={"name"} placeholder={localUser.name}/>
      <button onClick={editUser}>Submit</button>
    </form>
  )
}