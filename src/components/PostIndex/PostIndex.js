import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import PostList from './PostList';

export default function PostIndex(props) {
  const { interests, initialFilter } = props;

  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ filter, setFilter ] = useState(initialFilter ? [initialFilter] : []);

  useEffect(() => {
    const getPosts = function() {
      axios
        .get('http://localhost:3000/posts', { params: {filter}})
        .then(res => { 
          setPosts(() => res.data.posts);
          setUsers(() => res.data.users);
        })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [])

  return (
    <>
      <h1>Ur Mom</h1>
      <button><Link to={'/posts/new'}>New Post</Link></button>
      <PostList 
        posts={posts}
        users={users}
        interests={interests}     
      />
      <Outlet/>
    </>
  )
}