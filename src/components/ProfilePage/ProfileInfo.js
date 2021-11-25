import React from 'react'

export default function ProfileInfo(props) {
  const { localUser } = props;

  return (
    <div>
      <h1>{localUser.username}</h1>
      <p>{localUser.bio || "This is where your bio would be if you weren't such a dumb dumb"}</p>
    </div>
  )
}