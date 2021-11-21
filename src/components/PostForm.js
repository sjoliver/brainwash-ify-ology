import React from 'react'

export default function PostForm (props) {
  const { post, setPost, createData } = props;

  return (
    <form onSubmit={event => event.preventDefault()}>
    <input 
      name="title" 
      type="text" 
      placeholder="Please enter somethang"
      value={post.title}
      onChange={event => setPost({...post, title: event.target.value})}
    />
    <input 
      name="description" 
      type="text" 
      placeholder="Tell me about your thang"
      value={post.description}
      onChange={event => setPost({...post, description: event.target.value})}
    />
    <select name="post_type">
      <option value="video">Video</option> 
      <option value="audio">Audio</option>
      <option value="image">Image</option>
    </select> 
    <button onClick={createData}>Create new post</button>
  </form>
  )
}