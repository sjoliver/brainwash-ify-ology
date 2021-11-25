import React, { useDebugValue, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import PostList from './PostList';

export default function PostIndex(props) {
  const { interests, initialFilter, likeCounts, setLikeCounts } = props;

  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ filter, setFilter ] = useState(initialFilter ? [initialFilter] : []);

  const interestNames = interests.map((interestObj) => {
    return {label: interestObj.name, value: interestObj.id}
  })
  
  useEffect(() => {
    const getPosts = function() {
      axios
        .get('http://localhost:3000/posts', {params: {filter}})
        .then(res => { 
          console.log(res.data)
          setLikeCounts(() => res.data.postCounts);
          setPosts(() => res.data.posts);
          setUsers(() => res.data.users);
        })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [filter])

  return (
    <>
      <h1>Ur Mom</h1>
      <button><Link to={'/posts/new'}>New Post</Link></button>
      <MultiSelect 
        options={interestNames}
        value={filter}
        onChange={setFilter}
        labelledBy="Select"
      />
      <PostList 
        posts={posts}
        users={users}
        interests={interests}  
        likeCounts={likeCounts} 
        setLikeCounts={setLikeCounts}   
      />
      <Outlet/>
    </>
  )
}