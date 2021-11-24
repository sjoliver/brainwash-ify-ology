import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './NavBar.scss'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import axios from 'axios';

export default function NavBar(props) {
  const { setDbUser } = props
  const { user, isAuthenticated} = useAuth0();
  
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
      <p><Link to={'/'}>Home</Link></p>
      <Profile />
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      <Outlet />
    </section>
  )
}