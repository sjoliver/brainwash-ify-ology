import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './PostShow.scss';
//prefix of icon (Ai or Fi for ex) is what lib it belongs to, must import with that lib
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'


export default function PostShow (props) {
  const { dbUser } = props;
  //Do we want to show comments to users unauthorized users??? 
  const { isAuthenticated } = useAuth0();
  const [ postComments, setPostComments ] = useState([]);
  const [ comment, setComment ] = useState("");
  const [ post, setPost ] = useState({});
  //allows us to have a like count and array of all likes on initial render, updates if user likes post
  const [ likes, setLikes ] = useState([]);
  // set like to a user Id if exists
  const [ like , setLike ] = useState();
  const [ postUsername, setPostUsername ] = useState("");
  const { id } = useParams();

  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getCommentData = function() {
      axios
      .get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPostComments(res.data.comments)
        setPost(res.data.post)
        setLikes(res.data.likes)
        setPostUsername(res.data.userName)
      })
      .catch(e => console.error(e))
    }
    getCommentData();
  }, [])
  
  //If likes change - user is hard coded at the moment
  useEffect(() => {
    const foundLike = likes.find((like) => like.user_id === dbUser.id)
    //gives you either the like or undefined
    if (foundLike) {
      //sets the find id
      setLike(foundLike.id)
    } 
  }, [likes])

   //on submit, post request to back end to save comment to postComments
   const submitComment = () => {
    axios
      .post(`http://localhost:3000/comments`, {content: comment, user_id: dbUser.id, post_id: id})
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

  //sends a post request on click to add like to a given user id.
  const likePost = () => {
    axios
      .post(`http://localhost:3000/likes`, {user_id: dbUser.id, post_id: id})
      .then(res => {
        //increase like count for post
        setLike(res.data.id)
        setLikes(prev => {
          //joins new like to old likes
          return [...prev, res.data]
        })
      })
      .catch(e => console.error(e))
  }

  //sends a post request on click to remove liked post from user.
  const unlikePost = () => {
  axios
    .delete(`http://localhost:3000/likes/${like}`)
    .then(res => {
      //remove like Id
      setLike(null)
      //filter out all likes that are not the one we want to delete
      setLikes(prev => {
        return prev.filter((value) => value.id !== like)
      })
     })
    .catch(e => console.error(e))
  }

  return (
    <>
      <h1>{post.title}</h1>
      <div>
        <img 
          style={{height:"300px"}} 
          className="show-image" 
          src={post.upload_file} 
          alt="image on show page"
        />
      </div>
  
      { !like ?
        (< BsSuitHeart type="like" onClick={likePost}/>)
        :
        (< BsSuitHeartFill type="unlike" onClick={unlikePost} />)
      }
      <div>
        <strong>{postUsername}</strong>
      </div>
      {post.description}
    

      <p>Like count: {likes.length}</p>
      <p>Comment count: {postComments.length}</p>

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
        <ul key={i}>
          {obj.content}
          <button type="deleteComment" onClick={() => {deleteComment(obj.id)}}>Delete</button>
       </ul>)
      )}
      <Outlet/>
    </>
  );
}