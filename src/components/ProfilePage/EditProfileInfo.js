import axios from '../../axios-instance';
import React, { useState } from 'react'
import InputForm from './InputForm';
import './EditProfileInfo.scss'
import { TextField, Button, Input } from '@mui/material';

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
      })
      .then(() => {
        setMode(() => "");
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
    <form className="edit-form" onSubmit={event => event.preventDefault()} >
      <TextField className="edit-form__username" variant="standard" edit={edit} setEdit={setEdit} field={"username"} placeholder={localUser.username}/>
      <TextField variant="standard" edit={edit} setEdit={setEdit} field={"name"} placeholder={localUser.name}/>
      <TextField variant="standard" edit={edit} setEdit={setEdit} multiline field={"bio"} placeholder={localUser.bio || "enter your bio here..."}/>
      <Input type="file" name="upload_file" onChange={imgChange}/>
      <Button onClick={editUser} variant="contained">Save</Button>
    </form>
  )
}