import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import { Typography } from '@mui/material';


export default function PostContent(props) {
  const { post, upload, like, likes, likePost, unlikePost, commentInfo, postUserInfo } = props;

  return (
    <div className="post-content">
      <div className="post-content__video-box">
        {upload.content.includes("video") && 
          <video id="video" height="375" controls>
            <source src={upload.upload_file}/>
          </video>
        }
          <span className="post-content__counters">
            { !like ?
              (< FavoriteBorderIcon className="click-like" type="like" onClick={likePost}/>)
              :
              (< FavoriteIcon className="click-like" type="unlike" onClick={unlikePost} />)
            }
            {likes.length}&nbsp;&nbsp;&nbsp;&nbsp;

            < ChatIcon className="comment-count" /> {commentInfo.length}
          </span>
        </div>

        <div className="post-content__info">
        <p className="post-content__post-title">{post.title}</p>
          <Link to={`/profile/${postUserInfo.id}`} id="poster-username" style={{ textDecoration: 'none' }}> 
            {postUserInfo.username}
          </Link>
        
          <p className="post-content__post-description">{post.description}</p>
        
        </div>
    </div>
  )
}