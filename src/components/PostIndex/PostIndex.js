import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

export default function PostIndex(props) {
  const { interests } = props;

  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const getPosts = function() {
      axios
        .get('http://localhost:3000/posts')
        .then(res => { setPosts(() => res.data ) })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [])

  return (
    <>
      <PostList 
        posts={posts}
        interests={interests}     
      />
    </>
  )
}