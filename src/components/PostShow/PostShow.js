import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from '../../axios-instance';
import PostComments from './PostComments';
import NewComment from './NewComment';
import PostContent from './PostContent';
import './PostShow.scss';


export default function PostShow (props) {
  const { dbUser } = props;
  const [ comment, setComment ] = useState("");
  const [ post, setPost ] = useState({});
  const [ likes, setLikes ] = useState([]);
  const [ like , setLike ] = useState();
  const [ postUserInfo, setPostUserInfo ] = useState({ username: "", id: null });
  const { id } = useParams();
  const [ upload, setUpload ] = useState({ upload_file: "", content: "" });
  const [ commentInfo, setCommentInfo ] = useState([]);
  

  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getCommentData = function() {
      axios
      .get(`posts/${id}`)
      .then(res => {
        setPost(res.data.post)
        setLikes(res.data.likes)
        setPostUserInfo(res.data.postUserInfo)
        setUpload(res.data.file)
        setCommentInfo(prev => {
          return res.data.commentInfo.map(obj => {
            return {
              comment: obj.comment,
              user: {
                ...obj.user,
                avatar: obj.avatar
              }
            }
          })
        })
      })
      .catch(e => console.error(e))
    }
    getCommentData();
  }, [id])
  
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
    .post(`comments`, {content: comment, user_id: dbUser.id, post_id: id})
    .then(res => {
      //have to create object to include user info and comment info
      const newComment = {user: dbUser, comment: res.data}
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
    .delete(`comments/${comment_id}`)
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
    .post(`likes`, {user_id: dbUser.id, post_id: id})
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
    .delete(`likes/${like}`)
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
    < section className="postShow" >
      < PostContent 
        post={post} 
        upload={upload} 
        like={like} 
        likes={likes}
        likePost={likePost} 
        unlikePost={unlikePost}
        unlike={unlikePost}
        commentInfo={commentInfo}
        postUserInfo={postUserInfo}
        />
      < NewComment comment={comment} setComment={setComment} submitComment={submitComment} />
      < PostComments commentInfo={commentInfo} dbUser={dbUser} deleteComment={deleteComment}/>
      < Outlet />
    </ section >
  );
}