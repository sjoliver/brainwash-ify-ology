import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

export default function PostIndex(props) {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const getData = function() {
      axios
        .get('http://localhost:3000/posts')
        .then(res => { 
          console.log(res.data)
          setPosts(() => res.data.posts)
        })
        .catch(e => console.error(e))
    }

    getData();
  }, [])

  return (
    <>
      <PostList 
        posts={posts}      
      />
    </>
  )
}