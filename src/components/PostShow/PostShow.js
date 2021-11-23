import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostShow.scss';

export default function PostShow (props) {
  //Need to bring in individual post data through props (title, content, description, id, & likes)
  //Passing in user information related to that post
  const [ postShowData, setPostShowData ] = useState({
    userId: [],
    comments: [],
    comment: ""
  });

  //set state object for the post data info
  
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
        
        setPostShowData(() => {
          for (const item of res.data) {
            // console.log(item.user_id)
            // console.log(item.content)
            return {
              userId: item.user_id,
              comments: item.content
            }
          }
        })
      })
      .catch(e => console.error(e))
    }
    getPostData();
  }, [])

  // console.log("postShowData", postShowData)
  return (
    <>
      <h1>{post.title}</h1>
      <div>
        <img style={{height:"400px"}} className="show-image" src={post.upload_file} alt="image on show page"/>
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
               value={postShowData.comment}
               onChange={(event) => setPostShowData(
                 {...postShowData, comment: event.target.value}
                 )}
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
   
       </form>
     </div>

      <strong>{postShowData.userId} -- </strong>
      {postShowData.comments}
    </>
  );
}