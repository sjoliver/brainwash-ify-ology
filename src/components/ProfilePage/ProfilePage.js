import React, { useEffect, useState } from 'react';
import axios from '../../axios-instance';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi'

import PostIndex from '../PostIndex/PostIndex';
import ProfileInfo from './ProfileInfo';
import EditProfileInfo from './EditProfileInfo';
import { fetchImage } from '../../helpers/userHelpers';

export default function ProfilePage(props) {
  const { interests, dbUser, likeCounts, setLikeCounts } = props;

  let { id } = useParams();
  const { user } = useAuth0();

  const [localUser, setLocalUser] = useState({});
  const [userFilter, setUserFilter] = useState(dbUser.id);
  const [mode, setMode] = useState("");
  const [follows, setFollows] = useState({
    follow_id: null,
    how_many_user_is_following: null,
    how_many_followers_user_has: null,
    isFollowing: false
  });

  useEffect(()=> {
    const dbUserId = dbUser.id
    axios
      .get(`users/${id}?dbUserId=${dbUserId}`)
      .then(res => {
        setLocalUser(() => {
          return {
            ...res.data.user,
            avatar: res.data.avatar
          }
        })
        setUserFilter(() => res.data.user.id)
        setFollows(prev => {
          return {
            ...prev,
            follow_id: res.data.follow_id,
            how_many_user_is_following: res.data.how_many_user_is_following,
            how_many_followers_user_has: res.data.how_many_followers_user_has,
            isFollowing: res.data.isFollowing
        }
      })
    })
  }, [id, dbUser])

  const createFollow = () => {
    const followUsers = {followed_id: id, follower_id: dbUser.id}
    axios
      .post(`follows`, {follows: followUsers})
      .then((res) => {
        console.log(res.data)
        setFollows(prev => {
          return {
            ...prev,
            follow_id: res.data.follow_id,
            how_many_followers_user_has: prev.how_many_followers_user_has + 1,
            isFollowing: true
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteFollow = () => {
    axios
      .delete(`follows/${follows.follow_id}`)
      .then((res) => {
        setFollows(prev => {
          return {
            ...prev, 
            how_many_followers_user_has: prev.how_many_followers_user_has - 1,
            isFollowing: false
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const editMode = function() {
    setMode(prev => prev ? "" : "EDIT"); 
  }

  const isMyProfile = () => {
    if (dbUser.id === Number(id)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div>
        {!isMyProfile() && follows.isFollowing && <button onClick={deleteFollow}>Unfollow</button>}  
        {!isMyProfile() && !follows.isFollowing && <button onClick={createFollow}>Follow</button>}
        {isMyProfile() &&
          <div onClick={editMode}>
            <BiEditAlt size={32}/><span>Edit Profile</span>
          </div>
        }
        <div>
          <p>Followers: {follows.how_many_followers_user_has}</p>
          <p>Following: {follows.how_many_user_is_following}</p>
        </div>
        <img src={fetchImage(localUser, true)} alt="Profile Image" />
        {!mode && <ProfileInfo localUser={localUser}/>}
        {mode && 
          <EditProfileInfo 
            localUser={localUser}
            setLocalUser={setLocalUser}
            setMode={setMode}
          />
        }
      </div>
      <h1>Posts from {localUser.username}</h1>
      <PostIndex
        interests={interests}
        userFilter={userFilter}
        likeCounts={likeCounts}
        setLikeCounts={setLikeCounts}
      />
    </>
  )
}