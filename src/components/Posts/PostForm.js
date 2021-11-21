import React from 'react'

export default function PostForm (props) {
  const { post, setPost, createData } = props;

  return (
    <form onSubmit={event => event.preventDefault()}>
    <input 
      name="title" 
      type="text" 
      placeholder="Title"
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
    <select name="post_type" value={post.post_type}
      onChange={event => setPost({...post, post_type: event.target.value})}>
      <option value="Video">Video</option> 
      <option value="Audio">Audio</option>
      <option value="Image">Image</option>
    </select> 
    <select name="interest_name" value={post.interest_name}
    onChange={event => setPost({...post, interest_name: event.target.value})}>
      <option value="Cooking">Cooking</option> 
      <option value="Home Improvements">Home Improvements</option>
      <option value="Gardening">Gardening</option>
    </select> 
    <button onClick={createData}>Create new post</button>
  </form>
  )
}