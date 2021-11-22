import React , { useState } from 'react';
import axios from 'axios';

import PostListItem from './PostListItem';

export default function PostList(props) {
  const { posts } = props;

  const postList = posts.map((post) => {
    return (
      <PostListItem 
        key={post.id} 
        {...post}
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
      <h1>HEYS</h1>
      {postList}
    </>
  );
}