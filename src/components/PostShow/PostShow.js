import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostShow.scss';

export default function PostShow (props) {
  const [ postShowData, setPostShowData ] = useState([]);
  const [ comment, setComment ] = useState("")
  
  //Holder data until actual post information passed through props
  const post = {
    id: 1,
    title: "How to cook a sweet potato",
    description: "Watch me cook this huge sweet potato, she is so sweet",
    upload_file: "https://video-images.vice.com/articles/5a4d3c2c195444648780c02a/lede/1515013133112-Screen-Shot-2018-01-03-at-35241-PM.png?crop=0.9197530864197531xw:1xh;center,center&resize=1200:*",
    post_type: "video",
    user_id: 1,
    interest_id: 1
  }
  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getPostData = function() {
      axios
      .get(`http://localhost:3000/posts/${post.id}`)
      .then(res => {
        setPostShowData(res.data)
      })
      .catch(e => console.error(e))
    }
    getPostData();
  }, [])

   //on submit, post request to back end to save comment to post show data
   const submit = () => {
    axios
    .post(`http://localhost:3000/posts/${post.id}`, {content: comment})
    .then(res => {
      //only updates post show data if successful
      setPostShowData([
        ...postShowData,
        {content: comment}
      ])
    })
    .catch(e => console.error(e))
  }
  
  return (
    <>
      <h1>{post.title}</h1>
      <div>
        <img 
        style={{height:"400px"}} 
        className="show-image" 
        src={post.upload_file} 
        alt="image on show page"
        />
        {post.description}
      </div>

      <div className="wrapper">
        <h1>Comment Section</h1>
        <form onSubmit={event => event.preventDefault()} >
          <fieldset>
            <label>
              <input 
                name="comment" 
                type="text"
                placeholder="Write comment here"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </label>
            <button type="submit" onClick={submit}>Submit</button>
          </fieldset>
       </form>
     </div>

      {postShowData.map((obj, i) => (
        <ul>
          {obj.content}
       </ul>
      ))}
    </>
  );
}