import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './NavBar.scss'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { FaBrain } from 'react-icons/fa';

export default function NavBar(props) {
  const { dbUser } = props
  const { isAuthenticated} = useAuth0();

  return (
    <section className="navbar">
      <Link to={'/'} className="navbar__link"><FaBrain size={40} color={"pink"}/><p id='logo'>&nbsp;Brainwash</p></Link>
      <div className='navbar__actions'>
        <Profile dbUser={dbUser}/>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton size={20}/>}
      </div>
      <Outlet />
    </section>
  )
}