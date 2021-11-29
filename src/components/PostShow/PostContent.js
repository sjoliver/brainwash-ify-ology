import React from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';


export default function PostContent(props) {
  const { post, upload, like, likes, likePost, unlikePost, commentInfo, postUserInfo } = props;

  return (
    <>
      <p className="post-title">{post.title}</p>

      <div className="video">
        {upload.content.includes("video") && 
          <video width="320" height="240" controls>
            <source src={upload.upload_file} type="video/mp4"/>
          </video>
        }
        <Link to={`/profile/${postUserInfo.id}`}> {postUserInfo.username}</Link>
        {post.description}
      </div>
      
        

      <span className="counters">
          { !like ?
            (< FavoriteBorderIcon className="click-like" type="like" onClick={likePost}/>)
            :
            (< FavoriteIcon className="click-like" type="unlike" onClick={unlikePost} />)
          }
          {likes.length}&nbsp;&nbsp;

          < ChatIcon className="comment-count" /> {commentInfo.length}
        </span>
    </>
  )
}