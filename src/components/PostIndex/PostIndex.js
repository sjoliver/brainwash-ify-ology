import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from '../../axios-instance';
import PostList from './PostList';
import './PostIndex.scss'

export default function PostIndex(props) {
  const { interests, userFilter, posts, setPosts, dbUser } = props;

  const [ reload, setReload] = useState(false);
  const [ interestsFilter, setInterestsFilter ] = useState([]);
  const [ likesFilter, setLikesFilter ] = useState(null);

  useEffect(() => {
    const getPosts = function() {
      const filter = {
        interests: interestsFilter,
        user_id: userFilter || null,
        likesFilter: likesFilter
      }
      axios
        .get('posts', {params: {filter}})
        .then(res => {
          setPosts(prev => {
            return {
              ...prev,
              posts: res.data.posts,
              users: res.data.users,
              likes: res.data.likes,
              thumbnails: res.data.thumbnails,
              likeCounts: res.data.postCounts
            }
          }) 
        })
        .catch(e => console.error(e))
    }
    getPosts();
  }, [interestsFilter, userFilter, likesFilter, reload])

  return (
    <section className="post-index">
      <PostList 
        posts={posts.posts}
        users={posts.users}
        interests={interests}  
        likeCounts={posts.likeCounts} 
        thumbnails={posts.thumbnails}
        interestsFilter={interestsFilter}
        setInterestsFilter={setInterestsFilter}
        setReload={setReload}
        setLikesFilter={setLikesFilter}
        dbUser={dbUser}
        likes={posts.likes}
        setPosts={setPosts}
      />
      <Outlet/>
    </section>
  )
}