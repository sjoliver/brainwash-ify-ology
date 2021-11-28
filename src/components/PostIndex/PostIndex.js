import React, { useDebugValue, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import axios from '../../axios-instance';
import PostList from './PostList';

export default function PostIndex(props) {
  const { interests, userFilter, likeCounts, setLikeCounts } = props;

  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ interestsFilter, setInterestsFilter ] = useState([]);
  const [ thumbnails, setThumbnails ] = useState({});

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
        .get('posts', {params: {filter}})
        .then(res => { 
          setLikeCounts(() => res.data.postCounts);
          setPosts(() => res.data.posts);
          setUsers(() => res.data.users);
          setThumbnails(() => res.data.thumbnails)
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
        likeCounts={likeCounts} 
        setLikeCounts={setLikeCounts}
        thumbnails={thumbnails}
      />
      <Outlet/>
    </>
  )
}