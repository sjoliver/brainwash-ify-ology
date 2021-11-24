import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import PostList from './PostList';

export default function PostIndex(props) {
  const { interests } = props;

  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const getPosts = function() {
      axios
        .get('http://localhost:3000/posts')
        .then(res => { 
          setPosts(() => res.data.posts );
          setUsers(() => res.data.users );
        })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [])

  const newPostURL = '/posts/new'

  return (
    <>
      <h1>Ur Mom</h1>
      <button><Link to={newPostURL}>New Post</Link></button>
      <PostList 
        posts={posts}
        users={users}
        interests={interests}     
      />
      <Outlet/>
    </>
  )
}