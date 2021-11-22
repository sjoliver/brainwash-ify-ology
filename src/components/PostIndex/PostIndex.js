import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

export default function PostIndex(props) {
  const [ postData, setPostData ] = useState({
    posts: [],
    interests: []
  });

  useEffect(() => {
    const getData = function() {
      axios
        .get('http://localhost:3000/posts')
        .then(res => { 
          // console.log(res.data)
          setPostData(() => {
            return {
              posts: res.data.posts,
              interests: res.data.interests
            }
          })
        })
        .catch(e => console.error(e))
    }

    getData();
  }, [])

  return (
    <>
      <PostList 
        postData={postData}     
      />
    </>
  )
}