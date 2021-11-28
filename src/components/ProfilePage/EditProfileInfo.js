import axios from '../../axios-instance';
import React, { useState } from 'react'
import InputForm from './InputForm';

export default function EditProfileInfo(props) {
  const { localUser, setLocalUser, setMode } = props;
  const [edit, setEdit] = useState({});

  const editUser = function() {
    const form = new FormData();

    Object.keys(edit).forEach(key => {
      form.append(key, edit[key]);
    })

    axios
      .patch(`users/${localUser.id}`, form)
      .then(res => {
        setLocalUser(() => {
          return {
            ...res.data.user,
            avatar: res.data.avatar
          }
        })
        setMode(() => "");
        setEdit(() => {});
      })
      .catch(e => console.error(e))
  }

  const imgChange = event => {
    setEdit(prev => {
      let change = {
        ...prev
      };

      if (event.target.files[0]) {
        change["avatar"] = event.target.files[0];
      } else {
        delete change["avatar"];
      }

      return change;

    })
  }
  
  return (
    <form onSubmit={event => event.preventDefault()}>
      <InputForm edit={edit} setEdit={setEdit} field={"username"} placeholder={localUser.username}/>
      <InputForm edit={edit} setEdit={setEdit} field={"bio"} placeholder={localUser.bio || "enter your bio here..."}/>
      <InputForm edit={edit} setEdit={setEdit} field={"name"} placeholder={localUser.name}/>
      <input type="file" name="upload_file" onChange={imgChange}/>
      <button onClick={editUser}>Submit</button>
    </form>
  )
}