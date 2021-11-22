import React from 'react';

import PostListItem from './PostListItem';

export default function PostList(props) {
  const { posts, interests } = props;

  // creates array of PostListItem components which are passed the post details object as props
  const postList = posts.map((post) => {
    console.log(post)
    return (
      <PostListItem 
        key={post.id} 
        {...post}
        interests={interests}
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