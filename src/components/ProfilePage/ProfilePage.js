import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

import PostIndex from '../PostIndex/PostIndex';

export default function ProfilePage(props) {
  const { interests, dbUser } = props;
  const { user } = useAuth0();

  console.log(dbUser);
  return (
    <>
      <div>
        <img src={dbUser.avatar} alt="Profile Image" />
        <div>
          <h1>{dbUser.name}</h1>
          <p>{dbUser.bio || "This is where your bio would be if you weren't such a dumb dumb"}</p>
        </div>
      </div>
      <PostIndex interests={interests}/>
    </>
  )
}