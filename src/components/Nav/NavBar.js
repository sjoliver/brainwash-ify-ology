import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './NavBar.scss'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

export default function NavBar(props) {
  const { dbUser } = props
  const { isAuthenticated} = useAuth0();

  return (
    <section className="navbar">
      <p><Link to={'/'}>Home</Link></p>
      {isAuthenticated && <Link to={`/profile/${dbUser.id}`}>My Profile</Link>}
      <Profile dbUser={dbUser}/>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      <Outlet />
    </section>
  )
}