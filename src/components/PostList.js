import React , { useState } from 'react';
import axios from 'axios';
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

  const createData = function() {
    axios
      .post('http://localhost:3000/posts', { post })
      .then(res => { console.log("*************", res.data); })
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

  return(
    <>
      <h1>HEYS</h1>
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
        <button onClick={createData}>Create new post</button>
      </form>
      <button onClick={getData}>Get Some Shit</button>
      <button onClick={deleteData}>Delete Some Shit</button>
      {postList}
    </>
  );
}