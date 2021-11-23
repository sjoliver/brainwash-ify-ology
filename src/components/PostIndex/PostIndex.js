import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

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


  console.log(users);

  return (
    <>
      <PostList 
        posts={posts}
        users={users}
        interests={interests}     
      />
    </>
  )
}