import React, { useEffect, useState } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PostShow.scss';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
import { BsTrash } from 'react-icons/bs'
import { fetchImage } from '../../helpers/userHelpers';


export default function PostShow (props) {
  const { dbUser } = props;
  const [ comment, setComment ] = useState("");
  const [ post, setPost ] = useState({});
  //allows us to have a like count and array of all likes on initial render, updates if user likes post
  const [ likes, setLikes ] = useState([]);
  // set like to a user Id if exists
  const [ like , setLike ] = useState();
  const [ postUserInfo, setPostUserInfo ] = useState({ username: "", id: null });
  const { id } = useParams();
  const [ upload, setUpload ] = useState({ upload_file: "", content: "" });
  const [ commentInfo, setCommentInfo ] = useState([]);
  

  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getCommentData = function() {
      axios
      .get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPost(res.data.post)
        setLikes(res.data.likes)
        setPostUserInfo(res.data.postUserInfo)
        setUpload(res.data.file)
        setCommentInfo(res.data.commentInfo)
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
        //have to create object to include user info and comment info
        const newComment = {user: dbUser, comment: res.data}
        console.log(res.data)

        setCommentInfo([
          newComment,
          ...commentInfo])

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
        setCommentInfo((prev) => {
          //filter out all comments that are not the one we want to delete
          return prev.filter((commentInfo) => commentInfo.comment.id !== comment_id)
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
     
        {upload.content.includes("video") && 
          <video width="320" height="240" controls>
            <source src={upload.upload_file} type="video/mp4"/>
          </video>
        }

        <div>
        { !like ?
          (< BsSuitHeart type="like" onClick={likePost}/>)
          :
          (< BsSuitHeartFill type="unlike" onClick={unlikePost} />)
        }
        <strong>< Link to={`/profile/${postUserInfo.id}`}> {postUserInfo.username}</Link></strong>
      </div>
      {post.description}
    
      <p>Like count: {likes.length}</p>
      <p>Comment count: {commentInfo.length}</p>

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
      {commentInfo.map((obj, i) => (
        <ul key={i}>
          <img src={obj.user.social_img} width="40"/>
          <strong>< Link to={`/profile/${obj.user.id}`}> {obj.user.username}</Link></strong>
          <br/>
          {obj.comment.content}
          {(obj.comment.user_id === dbUser.id) && 
            < BsTrash type="deleteComment" onClick={() => {deleteComment(obj.comment.id)}}/>
          }
       </ul>
      ))}
      <Outlet/>
    </>
  );
}