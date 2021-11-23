import React from 'react';
import './NavBar.scss'

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

export default function NavBar(props) {
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