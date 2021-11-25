import React, { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

import PostIndex from '../PostIndex/PostIndex';
import axios from 'axios';

export default function ProfilePage(props) {
  const { interests, dbUser } = props;
  let { id } = useParams();
  const { user } = useAuth0();
  const [localUser, setLocalUser] = useState({});

  id = Number(id);

  useEffect(()=> {
      if (dbUser.id !== id) {
        axios
          .get(`http://localhost:3000/users/${id}`)
          .then(res => setLocalUser(() => res.data))
      } else {
        setLocalUser(() => dbUser);
      }
  }, [id])

  return (
    <>
      <div>
        <img src={localUser.avatar} alt="Profile Image" />
        <div>
          <h1>{localUser.name}</h1>
          <p>{localUser.bio || "This is where your bio would be if you weren't such a dumb dumb"}</p>
        </div>
      </div>
      <h1>Posts from {localUser.username}</h1>
      <PostIndex interests={interests} initialFilter={`user_id:${localUser.id}`}/>
    </>
  )
}