import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostFormInput from './PostFormInput';
import PostFormSelect from './PostFormSelect';
import { Outlet } from 'react-router-dom';

export default function PostForm (props) {
  // destructure props
  const { dbUser } = props
  console.log(dbUser.id);

  const initialPostState = {
    title: "",
    description: "",
    interest_name: "",
    upload_file: {},
    post_type: "",
    user_id: dbUser.id || null
  }

  //post state variable
  const [post, setPost] = useState(initialPostState);

  // do this in case dbUser isn't initially loaded when accessing this page somehow (happened a lot in testing)
  useEffect(() => {
    setPost(prev => {
      return {
        ...prev,
        user_id: dbUser.id
      }
    })
  }, [dbUser])

  // File input change function
  const onChange = (event) => {
    setPost(prev => {
      return {
        ...prev,
        upload_file: event.target.files[0]
      }
    })
  }
  
  // submit data to backend using axios and FormData
  const onSubmit = (event) => {
    event.preventDefault();
    
    // prevent empty select fields
    if (!post.post_type) {
      alert("Please select a type")
      return;
    }

    if (!post.interest_name) {
      alert("Please select an interest")
      return;
    }

    // create FormData object and populate with post state data
    const form = new FormData();
    Object.keys(post).forEach(elem => {
      form.append(elem, post[elem]);
    })

    // axios config to set the content-type to let rails know we're sending form data
    const config = {     
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    axios
      .post('http://localhost:3000/posts', form, config)
      .then(res => console.log(res.data))
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

  const inputProps = [titleInputProps, descInputProps];
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
      <form onSubmit={onSubmit}>
        {inputList}
        {selectList}
        <label>File</label>
        <input type="file" name="upload_file" onChange={onChange}/>
        <br/>
        <input type="submit" value="Create new post"/>
      </form>
      <Outlet/>
    </>
  )
}