import React , { useState } from 'react';
import axios from 'axios';

import PostListItem from './PostListItem';
import PostForm from './PostForm';

export default function PostList(props) {
  const { posts } = props;

  // const [post, setPost] = useState ({
  //   title: "",
  //   description: "",
  //   interest_name: "",
  //   upload_file: "",
  //   post_type: ""
  // });

  const postList = posts.map((post) => {
    return (
      <PostListItem 
        key={post.id} 
        {...post}
      />
    )
  })

  console.log("ayoooooo",postList)

  // const createData = function() {
  //   axios
  //     .post('http://localhost:3000/posts', { post })
  //     .then(res => { console.log("*************", res); })
  //     .catch(e => console.error(e))

  //   setPost({
  //     title: "",
  //     description: "",
  //     interest_name: "",
  //     upload_file: "",
  //     post_type: ""
  //   })
  // }
  
  // const postProps = {
  //   post,
  //   setPost,
  //   createData
  // }

  // const getData = function() {
  //   axios
  //     .get('http://localhost:3000/posts')
  //     .then(res => { console.log(res) })
  //     .catch(e => console.error(e))
  // }

  // const deleteData = function() {
  //   axios
  //     .delete('http://localhost:3000/posts/3')
  //     .then(res => console.log(res))
  //     .catch(e => console.error(e))
  // }

  return(
    <>
      <h1>HEYS</h1>

      {postList}
    </>
  );
}