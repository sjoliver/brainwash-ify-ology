import React from 'react'

import './ProfileInfo.scss'

export default function ProfileInfo(props) {
  const { localUser } = props;

  return (
    <div className="username-bio">
      <h2 id="username">{localUser.username}</h2>
      <p id="user-bio">{localUser.bio || "This is where your bio would be if you weren't such a dumb dumb"}</p>
    </div>
  )
}