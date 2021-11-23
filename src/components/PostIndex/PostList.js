import React from 'react';
import PostListItem from './PostListItem';
import PostForm from '../PostForm/PostForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

  const indexUrl = '/posts'
  const newPostURL = '/posts/new'

  return(
    <>
      <h1>Ur Mom</h1>
      <Router>
        <Routes>
          <Route exact path={newPostURL} element={<PostForm />}/>
          <Route exact path={indexUrl} element={
            <div className="post-list">
              {postList}
            </div>
          }/>
        </Routes>
      </Router>
    </>
  );
}