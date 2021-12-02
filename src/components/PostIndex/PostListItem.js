import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VideocamIcon from '@mui/icons-material/Videocam';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ClearIcon from '@mui/icons-material/Clear';

import Loading from '../PostForm/Loading'

import './PostListItem.scss'
import axios from '../../axios-instance';

export default function PostListItem(props) {

const [mode, setMode] = useState("");
const [like, setLike] = useState(null);
const [numOfLikes, setNumOfLikes] = useState(0);

const { id, title, interest_id, post_type, user_id, interests, users, likeCounts, thumbnails, setReload, dbUser, likes, setLikes } = props;

let interest = "";
let userName = "";
let comments = 0;

useEffect(() => {
  for (let interestObj of interests) {
    if (interestObj.id === interest_id) {
      interest = interestObj.name
    }
  }
  
  for (let userObj of users) {
    if (userObj.id === user_id) {
      userName = userObj.username
    }
  }
  
  for (let likesObj of likeCounts) {
    if (Number(Object.keys(likesObj)[0]) === id) {
      comments = likesObj[id][1];
      setNumOfLikes(likesObj[id][0]);
    }
  }
}, [])



  const likePost = (event) => {
    event.preventDefault();
    
    axios
    .post('likes', {user_id: dbUser.id, post_id: id})
    .then(res => {
      setLike(res.data.id)
      setNumOfLikes(prev => prev++);
      })
  }

  const unlikePost = (event) => {
    event.preventDefault();
    
    axios
    .delete(`likes/${like}`)
    .then(res => {
      setLike(null)
      setNumOfLikes(prev => prev--);
    })
  }

  useEffect(()=> {
    for (let likeObj of likes[id]) {
      if (likeObj.user_id === dbUser.id) {
        return setLike(likeObj.id)
      }
    }
  }, [])
  // on initial render, check the array of existing likes for the current user's id
  // if exists, set like (state) to that like_id
  // likes = {
  //    post_id: [{id: 1, user_id:2, post_id:3}, {}, {}]
  // }

  const deletePost = event => {
    // stop bubbling up to parent react router Link element
    event.preventDefault();

    setMode(prev => "DELETING");

    axios
      .delete(`posts/${id}`)
      .then(() => {
        setReload(prev => prev ? false : true);
        // setMode(prev => "");
      })
  }

  return (
    <Link to={`/posts/${id}`} className="post-card">
      <Card className={`card-component ${mode === "DELETING" ? "card-component_deleting" : ""}`}>
        {mode === "DELETING" ? <Loading message={"Deleting"} element={"postitem"}/> : <CardActionArea>
        {(dbUser.id === user_id) && 
          <div className="delete-post-icon">
            <ClearIcon fontSize={"medium"} onClick={deletePost}/>
          </div>
        }
          <CardMedia 
            component="img"
            height="215"
            image={thumbnails[id]}
            alt="content card"
          />
          
          <CardContent className="card-content">
            <CardHeader 
              title={title}
              subheader={interest}
            />
            <div className="card-info">
              <Typography variant="body2" color="text.secondary">
               {post_type.toLowerCase() === "video" ? (
                  <span> {userName}&nbsp; <VideocamIcon /> </span>
                ) : (
                  <span> {userName} &nbsp;<PodcastsIcon /> </span>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="likes-comments">
                { !like ?
                  (< FavoriteBorderIcon className="heart-icon" sx={{fontSize: 18}} type="like" onClick={likePost}/>)
                  :
                  (< FavoriteIcon className="heart-icon" sx={{fontSize: 18}} type="unlike" onClick={unlikePost} />)
                }
                &nbsp;{numOfLikes} &nbsp;&nbsp;&nbsp;<ChatIcon sx={{fontSize: 18}}/> &nbsp;{comments}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>}
      </Card>
      <Outlet/>
    </Link>
  );
}