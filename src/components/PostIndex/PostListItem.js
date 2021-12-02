import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
const [display, setDisplay] = useState({
  interest: "",
  username: "",
  commentCount: 0,
  likeCount: 0
})

const { isAuthenticated } = useAuth0();

const { id, title, interest_id, post_type, user_id, interests, users, likeCounts, thumbnails, setReload, dbUser, likes} = props;


useEffect(() => {
  let interest = "";
  let userName = "";
  let comments = 0;
  let numLikes = 0;

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
      numLikes = likesObj[id][0];
    }
  }

  setDisplay(() => {
    return {
      interest,
      username: userName,
      commentCount: comments,
      likeCount: numLikes
    }
  })

}, [users])


  const likePost = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      return;
    }
    
    axios
    .post('likes', {user_id: dbUser.id, post_id: id})
    .then(res => {
      setLike(res.data.id)
      setDisplay(prev => {
        return {
          ...prev,
          likeCount: prev.likeCount++
        }
      });
    })
  }

  const unlikePost = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      return;
    }
    
    axios
    .delete(`likes/${like}`)
    .then(res => {
      setLike(null)
      setDisplay(prev => {
        return {
          ...prev,
          likeCount: prev.likeCount--
        }
      });
    })
  }

  useEffect(()=> {
    for (let likeObj of likes[id]) {
      if (likeObj.user_id === dbUser.id) {
        return setLike(likeObj.id)
      }
    }
  }, [dbUser])

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
              subheader={display.interest}
            />
            <div className="card-info">
              <Typography variant="body2" color="text.secondary">
               {post_type.toLowerCase() === "video" ? (
                  <span> {display.username}&nbsp; <VideocamIcon /> </span>
                ) : (
                  <span> {display.username} &nbsp;<PodcastsIcon /> </span>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="likes-comments">
                { !like ?
                  (< FavoriteBorderIcon className="heart-icon" sx={{fontSize: 24}} type="like" onClick={likePost}/>)
                  :
                  (< FavoriteIcon className="heart-icon" sx={{fontSize: 24}} type="unlike" onClick={unlikePost} />)
                }
                &nbsp;{display.likeCount} &nbsp;&nbsp;&nbsp;<ChatIcon sx={{fontSize: 22}}/> &nbsp;{display.commentCount}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>}
      </Card>
      <Outlet/>
    </Link>
  );
}