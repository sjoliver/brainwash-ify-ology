import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import './PostShow.scss';

export default function PostShow (props) {
  const [ postComments, setPostComments ] = useState([]);
  const [ comment, setComment ] = useState("");
  const [ post, setPost ] = useState({});
  //sets ALL likes
  const [ likes, setLikes ] = useState(0);
  // sets like boolean for logged in user
  const [ like , setLike ] = useState(false)
  const { id } = useParams();

  // fetch comments for specific post id (comments related to post)
  useEffect(() => {
    const getCommentData = function() {
      axios
      .get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPostComments(res.data.comments)
        setPost(res.data.post)
        setLikes(res.data.likeCount)
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

  //sends a post request on click to add like to a given user id.
  const likePost = () => {
    axios
      .post(`http://localhost:3000/likes`, {user_id: 2, post_id: id})
      .then(res => {
        //increase like count for post
        setLikes((prev) => prev + 1)
        setLike(true)
      })
      .catch(e => console.error(e))
  }

  //sends a post request on click to remove liked post from user.
  const unlikePost = () => {
    setLike(false)
  }

  // const unlikePost = (like_id) => {
  //   axios
  //     .delete(`http://localhost:3000/likes${like_id}`)
  //     .then(res => {
  //       console.log(res)
  //       setLike(false)
  //     })
  //     .catch(e => console.error(e))
  // }

 console.log(like)

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
        {post.description}
      </div>
      {/* render like/unlike button based on like boolean */}
      { !like ?
        (<button type="like" onClick={likePost}> Like </button>)
        :
        (<button type="unlike" onClick={unlikePost}> Unlike </button>)
      }

      <p>Like count: {likes}</p>
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
        <ul>
          {obj.content}
          <button type="deleteComment" onClick={() => {deleteComment(obj.id)}}>Delete</button>
       </ul>
      ))}
      <Outlet/>
    </>
  );
}