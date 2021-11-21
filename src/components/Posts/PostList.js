import React , { useState } from 'react';
import axios from 'axios';

import PostListItem from './PostListItem';
import PostForm from './PostForm';

export default function PostList(props) {
  const [post, setPost] = useState ({
    title: "",
    description: "",
    interest_name: "",
    post_type: ""
  });
  

  const postList = [];
  for (let i = 0; i < 5; i++) {
    postList.push(< PostListItem key={i}/>)
  }

  const createData = function() {
    axios
      .post('http://localhost:3000/posts', { post })
      .then(res => { console.log("*************", res); })
      .catch(e => console.error(e))

    setPost({
      title: "",
      description: ""
    })
  }
  
  const getData = function() {
    axios
      .get('http://localhost:3000/posts')
      .then(res => { console.log(res) })
      .catch(e => console.error(e))
  }

  const deleteData = function() {
    axios
      .delete('http://localhost:3000/posts/3')
      .then(res => console.log(res))
      .catch(e => console.error(e))
  }

  const postProps = {
    post,
    setPost,
    createData
  }

  return(
    <>
      <PostForm {...postProps}/>
      <button onClick={getData}>Get Some Shit</button>
      <button onClick={deleteData}>Delete Some Shit</button>
      {postList}
    </>
  );
}