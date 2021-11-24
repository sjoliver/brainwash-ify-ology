import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './NavBar.scss'

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import axios from 'axios';

export default function NavBar(props) {
  const { setDbUser } = props
  const { user } = useAuth0();
  
  useEffect(() => {
    if (user) {
      const { email, name, picture, username, nickname } = user;
      const params = {
        email,
        name,
        avatar: picture,
        username: username || nickname,
        social_id: user.sub
      }

      axios
        .post('http://localhost:3000/users', params)
        .then(res => {
          setDbUser(prev => res.data)
        })
    }
  }, [user])

  return (
    <section className="navbar">
    
        <a href="/home">Home</a>
        <Profile />
        <a href="/Settings">Settings</a>
        <LoginButton />
        <LogoutButton />
        <a href="/Signup">Signup</a>
  
    </section>
  )
}