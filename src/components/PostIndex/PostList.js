import React from 'react';
import PostListItem from './PostListItem';
import { Outlet } from 'react-router-dom';

import './PostList.scss'

export default function PostList(props) {
  const { posts, users, interests } = props;

  // creates array of PostListItem components which are passed the post details object as props
  const postList = posts.map((post) => {
    return (
      <PostListItem 
        key={post.id} 
        {...post}
        interests={interests}
        users={users}
      />
    )
  })

  // const deleteData = function() {
  //   axios
  //     .delete('http://localhost:3000/posts/3')
  //     .then(res => console.log(res))
  //     .catch(e => console.error(e))
  // }

  return(
    <>
      <div className="post-list">
        {postList}
      </div>
      <Outlet/>
    </>
  );
}