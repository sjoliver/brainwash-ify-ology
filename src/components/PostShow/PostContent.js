import React from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';


export default function PostContent(props) {
  const { post, upload, like, likes, likePost, unlikePost, commentInfo, postUserInfo } = props;

  return (
    <div className="post-content">

      <p className="post-content__post-title">{post.title}</p>

      <div className="post-content__video-box">
        {upload.content.includes("video") && 
          <video id="video" height="275" controls>
            <source src={upload.upload_file} type="video/mp4"/>
          </video>
        }
        <div className="post-content__info">
          <Link to={`/profile/${postUserInfo.id}`} id="poster-username" style={{ textDecoration: 'none' }}> 
            {postUserInfo.username}
          </Link>
        
          <p>{post.description}</p>

          <span className="post-content__counters">
            { !like ?
              (< FavoriteBorderIcon className="click-like" type="like" onClick={likePost}/>)
              :
              (< FavoriteIcon className="click-like" type="unlike" onClick={unlikePost} />)
            }
            {likes.length}&nbsp;&nbsp;

            < ChatIcon className="comment-count" /> {commentInfo.length}
         </span>
        </div>
      </div>
    </div>
  )
}