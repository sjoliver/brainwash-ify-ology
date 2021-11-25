import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './PostListItem.scss'

export default function PostListItem(props) {

  const { id, title, interest_id, upload_file, post_type, user_id, interests, users, likeCounts, setLikeCounts } = props;

  let interest = "";
  for (let interestObj of interests) {
    if (interestObj.id === interest_id) {
      interest = interestObj.name
    }
  }

  let userName = "";
  for (let userObj of users) {
    if (userObj.id === user_id) {
      userName = userObj.name
    }
  }

  let likes = 0; 
  let comments = 0;
  for (let likesObj of likeCounts) {
    if (Number(Object.keys(likesObj)[0]) === id) {
      likes = likesObj[id][0];
      comments = likesObj[id][1];
    }
  }

  return (
    <div className="post-card">
      <div>
        <img className="post-thumbnail" src={upload_file} alt="content card"/>
        <h4><Link to={`/posts/${id}`}>{title}</Link></h4>
        <p>{userName} | {interest} | {post_type} | Likes: {likes} | Comments: {comments}</p>
      </div>
      <Outlet/>
    </div>
  );
}