import React , { useState } from 'react';
import PostListItem from './PostListItem';

export default function PostList(props) {
  const [post, setPost] = useState ({
    title: "",
    description: ""
  });
  

  const postList = [];
  for (let i = 0; i < 5; i++) {
    postList.push(< PostListItem key={i}/>)
  }

  return(
    <>
      <h1>HEYS</h1>
      <form>
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
      <button onClick={() => {alert(`${post.title} ${post.description}`)}}>Create new post</button>
      </form>
      
      {postList}
    </>
  );
}