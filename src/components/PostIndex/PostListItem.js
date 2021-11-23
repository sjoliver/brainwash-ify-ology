import React from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';

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

  const indexUrl = '/posts'
  const newPostURL = '/posts/new'

  return (
    <div className="post-card">
      <div>
        <img className="post-thumbnail" src={upload_file} alt="content card"/>
        <h4><Link to={newPostURL}>{title}</Link></h4>
        <p>{userName} | {interest} | {post_type}</p>
      </div>
    </div>
  );
}