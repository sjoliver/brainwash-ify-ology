import React from 'react'

import PostFormInput from './PostFormInput';
import PostFormSelect from './PostFormSelect';

export default function PostForm (props) {
  // destructure props
  const { post, setPost, createData } = props;

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
    options: ["Video", "Audio", "Image"],
    postState: post.post_type,
    onChange: event => setPost({...post, post_type: event.target.value})
  }

  // interest props
  const interestProps = {
    name: "interest_name",
    options: ["Cooking", "Home Improvements", "Gardening"],
    postState: post.interest_name,
    onChange: event => setPost({...post, interest_name: event.target.value})
  }

  return (
    <>
      <h1>Create Your Post</h1>
      <form onSubmit={event => event.preventDefault()}>
        <PostFormInput {...titleInputProps} />
        <PostFormInput {...descInputProps} />
        <PostFormSelect {...typeProps} />
        <PostFormSelect {...interestProps} />
        <button onClick={createData}>Create new post</button>
      </form>
    </>
  )
}