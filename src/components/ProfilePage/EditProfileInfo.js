import axios from '../../axios-instance';
import React, { useState } from 'react'
import './EditProfileInfo.scss'
import { TextField, Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


export default function EditProfileInfo(props) {
  const { localUser, setLocalUser, setMode, isMyProfile, setDbUser } = props;
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
        if (isMyProfile()) {
          setDbUser(prev => {
           return {
              ...prev,
              username: res.data.user.username,
              avatar: res.data.avatar
            }
          })
        }
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
  
  const onChange = (event, field) => {
    setEdit(prev => {
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
    })
  }

  return (
    <form className="edit-form" onSubmit={event => event.preventDefault()} >
      <TextField size="small" className="form-input" onChange={event => onChange(event, "username")} placeholder={localUser.username}/>
      <TextField size="small" className="form-input" onChange={event => onChange(event, "name")} placeholder={localUser.name}/>
      <TextField multiline size="small" className="form-input" onChange={event => onChange(event, "bio")}placeholder={localUser.bio || "enter your bio here..."}/>
      <label htmlFor="update-avatar">
        <input id="update-avatar" type="file" name="upload_file" onChange={imgChange}/>
        <div className="edit-form__update-image">
          <Button id="img-submit" variant="outlined" component="span"><AddAPhotoIcon/>&nbsp;&nbsp;Update Image</Button>
          {edit.avatar ? <p>&nbsp;&nbsp;&nbsp;{edit.avatar.name}</p> : <p>&nbsp;&nbsp;&nbsp;No file chosen</p>}
        </div>
      </label>    
      <Button onClick={editUser} variant="contained">Save</Button>
    </form>
  )
}