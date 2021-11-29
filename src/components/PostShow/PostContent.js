import React from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { fetchImage } from '../../helpers/userHelpers';

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
      </div>

      
        { !like ?
          (< BsSuitHeart type="like" onClick={likePost}/>)
          :
          (< BsSuitHeartFill type="unlike" onClick={unlikePost} />)
        }
        <strong><
           Link to={`/profile/${postUserInfo.id}`}> {postUserInfo.username}</Link>
        </strong>
     
      {post.description}

      <p>Like count: {likes.length}</p>
      <p>Comment count: {commentInfo.length}</p>
    </>
  )
}