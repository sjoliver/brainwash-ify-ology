import React, { useState } from 'react';
import axios from 'axios';

import PostFormInput from './PostFormInput';
import PostFormSelect from './PostFormSelect';
import { Outlet } from 'react-router-dom';

export default function PostForm (props) {
  // destructure props
  
  //post state variable
  const [post, setPost] = useState ({
    title: "",
    description: "",
    interest_name: "",
    upload_file: "",
    post_type: "",
    user_id: 2
  });

  //axios request to create data from post form and persist to db 
  const createData = function() {
    if (!post.post_type) {
      alert("Please select a type")
      return;
    }

    if (!post.interest_name) {
      alert("Please select an interest")
      return;
    }

    axios
      .post('http://localhost:3000/posts', { post })
      .then(res => { console.log("*************", res); })
      .catch(e => console.error(e))
  }

  // Create props objects to pass to each element

  // Title Input props
  const titleInputProps = {
    name: "title",
    type: "text",
    placeholder: "Title",
    postState: post.title,
    onChange: event => setPost({...post, title: event.target.value})
  }

  // Description Input props
  const descInputProps = {
    name: "description",
    type: "text",
    placeholder: "Tell me aboot it...",
    postState: post.description,
    onChange: event => setPost({...post, description: event.target.value})
  }

  // File link Input props
  const uploadInputProps = {
    name: "upload_file",
    type: "text",
    placeholder: "Post a url",
    postState: post.upload_file,
    onChange: event => setPost({...post, upload_file: event.target.value})
  }

  // post_type Props
  const typeProps = {
    name: "post_type",
    options: ["<select>","Video", "Audio", "Image"],
    postState: post.post_type,
    onChange: event => setPost({...post, post_type: event.target.value})
  }

  // interest props
  const interestProps = {
    name: "interest_name",
    options: ["<select>", "Cooking", "Home Improvements", "Gardening"],
    postState: post.interest_name,
    onChange: event => setPost({...post, interest_name: event.target.value})
  }

  const inputProps = [titleInputProps, descInputProps, uploadInputProps];
  const selectProps = [typeProps, interestProps];


  const inputList = inputProps.map((input, i) => {
    return (
      <PostFormInput key={i} {...input}/>
    )
  })

  const selectList = selectProps.map((select, i) => {
    return (
      <PostFormSelect key={i} {...select}/>
    )
  })

  return (
    <>
      <h1>Create Your Post</h1>
      <form onSubmit={event => event.preventDefault()}>
        {inputList}
        {selectList}
        <button onClick={createData}>Create new post</button>
      </form>
      <Outlet/>
    </>
  )
}