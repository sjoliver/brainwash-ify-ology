import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi'

import PostIndex from '../PostIndex/PostIndex';
import ProfileInfo from './ProfileInfo';
import EditProfileInfo from './EditProfileInfo';
import { fetchImage } from '../../helpers/userHelpers';

export default function ProfilePage(props) {
  const { interests, dbUser, likeCounts, setLikeCounts } = props;

  let { id } = useParams();
  const { user } = useAuth0();

  const [localUser, setLocalUser] = useState({});
  const [userFilter, setUserFilter] = useState(dbUser.id);
  const [mode, setMode] = useState("");

  // id = Number(id);

  useEffect(()=> {
      if (dbUser.id !== id) {
        axios
          .get(`http://localhost:3000/users/${id}`)
          .then(res => {
            setLocalUser(() => {
              return {
                ...res.data.user,
                avatar: res.data.avatar
              }
            })
            setUserFilter(() => res.data.id)
          })
      } else {
        setLocalUser(() => {return {...dbUser};});
      }
  }, [id])

  const editMode = function() {
    setMode(prev => prev ? "" : "EDIT"); 
  }

  return (
    <>
      <div>
        <div onClick={editMode}>
          <BiEditAlt size={32}/><span>Edit Profile</span>
        </div>
        <div>
          <img src={fetchImage(localUser, true)} alt="Profile Image" />
        </div>  
        {!mode && <ProfileInfo localUser={localUser}/>}
        {mode && 
          <EditProfileInfo 
            localUser={localUser}
            setLocalUser={setLocalUser}
            setMode={setMode}
          />
        }
      </div>
      <h1>Posts from {localUser.username}</h1>
      <PostIndex
        interests={interests}
        userFilter={userFilter}
        likeCounts={likeCounts}
        setLikeCounts={setLikeCounts}
      />
    </>
  )
}