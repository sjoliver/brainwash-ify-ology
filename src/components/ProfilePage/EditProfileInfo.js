import React from 'react'
import InputForm from './InputForm';

export default function EditProfileInfo(props) {
  const { localUser } = props;

  const editUser = function() {
    console.log("clicked");
  }

  return (
    <form onSubmit={event => event.preventDefault()}>
      <InputForm localUser={localUser}/>
      <button onClick={editUser}>Create new post</button>
    </form>
  )
}