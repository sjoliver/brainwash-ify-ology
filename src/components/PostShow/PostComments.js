import React from 'react';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs'

export default function PostComments (props) {
  const { commentInfo, dbUser, deleteComment } = props;

  return (
    <div>
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
    </div>
  )
}