import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi'

import PostIndex from '../PostIndex/PostIndex';
import ProfileInfo from './ProfileInfo';

export default function ProfilePage(props) {
  const { interests, dbUser, likeCounts, setLikeCounts } = props;

  let { id } = useParams();
  const { user } = useAuth0();

  const [localUser, setLocalUser] = useState({});
  const [userFilter, setUserFilter] = useState(dbUser.id);
  const [mode, setMode] = useState("");

  id = Number(id);

  useEffect(()=> {
      if (dbUser.id !== id) {
        axios
          .get(`http://localhost:3000/users/${id}`)
          .then(res => {
            setLocalUser(() => res.data)
            setUserFilter(() => res.data.id)
          })
      } else {
        setLocalUser(() => dbUser);
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
          <img src={localUser.avatar} alt="Profile Image" />
        </div>  
        {mode && <ProfileInfo localUser={localUser}/>}
        {!mode && <div>Testing this guy</div>}
      </div>
      <h1>Posts from {localUser.username}</h1>
      <PostIndex interests={interests} userFilter={userFilter} likeCounts={likeCounts} setLikeCounts={setLikeCounts}/>
    </>
  )
}