import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchImage } from '../../helpers/userHelpers';

export default function PostComments (props) {
  const { commentInfo, dbUser, deleteComment } = props;

  return (
    <div className="comment">
      {commentInfo.map((obj, i) => (
        <ul key={i}>
          <Link to={`/profile/${obj.user.id}`} className="avatar-username" style={{ textDecoration: 'none' }}>
              <Avatar src={fetchImage(obj.user, false)} className="postShow__avatar" sx={{ width: 36, height: 36 }}/>
                <span className="postShow__username">{obj.user.username}</span>
          </Link>
          <span className="postShow__comment-description">{obj.comment.content}&nbsp;&nbsp;
          {(obj.comment.user_id === dbUser.id) && 
            < ClearIcon type="deleteComment" className="delete-ex" onClick={() => {deleteComment(obj.comment.id)}}/>
          }</span>
        </ul>
      ))}
    </div>
  )
}