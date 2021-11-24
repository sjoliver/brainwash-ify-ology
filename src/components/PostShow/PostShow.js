import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import './PostShow.scss';

export default function PostShow (props) {
  const [ postComments, setPostComments ] = useState([]);
  const [ comment, setComment ] = useState("")
  const { id } = useParams();

  
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

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        console.log("********", res.data)
      })
  }, [])

  
  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getCommentData = function() {
      axios
      .get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPostComments(res.data.comments)
      })
      .catch(e => console.error(e))
    }
    getCommentData();
  }, [])

   //on submit, post request to back end to save comment to postComments
   const submitComment = () => {
    axios
    .post(`http://localhost:3000/comments`, {content: comment, user_id: 2, post_id: id})
    .then(res => {
      //receives comment json from back end and adds it to postComments
      const newComment = res.data    
      setPostComments([
        newComment,
        ...postComments
      ])
      //clears input form on submit
      setComment("")
    })
    .catch(e => console.error(e))
  }

  //deletes comment via comment_id passed through function call
  const deleteComment = (comment_id) => {
    axios
    .delete(`http://localhost:3000/comments/${comment_id}`)
    .then(res => {
      setPostComments((prev) => {
        //filter out all comments that are not the one we want to delete
        return prev.filter((comment) => comment.id !== comment_id)
      })  
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
            <button type="submitComment" onClick={submitComment}>Submit</button>
          </fieldset>
       </form>
     </div>
      {/* id accessible through postComments obj - sent through delete comment function call */}
      {postComments.map((obj, i) => (
        <ul>
          {obj.content}
          <button type="deleteComment" onClick={() => {deleteComment(obj.id)}}>Delete</button>
       </ul>
      ))}
      <Outlet/>
    </>
  );
}