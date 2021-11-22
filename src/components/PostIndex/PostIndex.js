import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

export default function PostIndex(props) {
  const { interests } = props;

  const [ postData, setPostData ] = useState([]);

  useEffect(() => {
    const getData = function() {
      axios
        .get('http://localhost:3000/posts')
        .then(res => { setPostData(() => res.data ) })
        .catch(e => console.error(e))
    }
    getData();
  }, [])

  return (
    <>
      <PostList 
        postData={postData}
        interests={interests}     
      />
    </>
  )
}