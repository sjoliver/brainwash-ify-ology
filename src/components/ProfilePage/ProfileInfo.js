import React from 'react'
import './ProfileInfo.scss'
import Button from '@mui/material/Button';
import { BiEditAlt } from 'react-icons/bi'

export default function ProfileInfo(props) {
  const { localUser, follows, isMyProfile, editMode, createFollow, deleteFollow } = props;

  return (
    <div className="username-bio">

      <div className="username-action-buttons">
        <h2 id="username">{localUser.username}</h2>
        <div className="follow-buttons">
          {!isMyProfile() && !follows.isFollowing && <Button variant="contained" size="medium"  onClick={createFollow}>Follow</Button>}
          {!isMyProfile() && follows.isFollowing && <Button variant="contained" size="medium" onClick={deleteFollow}>Unfollow</Button>}  
        </div>
       <div className="edit-profile">
        {isMyProfile() &&
          <Button variant="contained" size="medium" onClick={editMode}><BiEditAlt size={20}/>&nbsp;&nbsp;Edit</Button>
        }
        </div>
      </div>
      <span className="followers-following">
        <p><b>{follows.how_many_followers_user_has}</b> followers &nbsp;&nbsp;</p>
        <p><b>{follows.how_many_user_is_following}</b> following</p>
      </span>
      <p id="user-bio">{localUser.bio || "This is where your bio would be if you weren't such a dumb dumb"}</p>
    </div>
  )
}