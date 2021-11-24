import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './PostListItem.scss'

export default function PostListItem(props) {

  const { id, title, interest_id, upload_file, post_type, user_id, interests, users } = props;

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

  return (
    <div className="post-card">
      <div>
        <img className="post-thumbnail" src={upload_file} alt="content card"/>
        <h4><Link to={`/posts/${id}`}>{title}</Link></h4>
        <p>{userName} | {interest} | {post_type} | Likes: 5 | Comments: 2</p>
      </div>
      <Outlet/>
    </div>
  );
}