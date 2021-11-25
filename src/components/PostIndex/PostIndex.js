import React, { useDebugValue, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import PostList from './PostList';

export default function PostIndex(props) {
  const { interests, userFilter } = props;

  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ interestsFilter, setInterestsFilter ] = useState([]);

  const interestNames = interests.map((interestObj) => {
    return {label: interestObj.name, value: interestObj.id}
  })
  

  useEffect(() => {
    const getPosts = function() {
      const filter = {
        interests: interestsFilter,
        user_id: userFilter || null
      }
      axios
        .get('http://localhost:3000/posts', {params: {filter}})
        .then(res => { 
          console.log(res.data)
          setPosts(() => res.data.posts);
          setUsers(() => res.data.users);
        })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [interestsFilter, userFilter])

  return (
    <>
      <h1>Ur Mom</h1>
      <button><Link to={'/posts/new'}>New Post</Link></button>
      <MultiSelect 
        options={interestNames}
        value={interestsFilter}
        onChange={setInterestsFilter}
        labelledBy="Select"
      />
      <PostList 
        posts={posts}
        users={users}
        interests={interests}     
      />
      <Outlet/>
    </>
  )
}