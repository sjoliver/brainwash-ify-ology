import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VideocamIcon from '@mui/icons-material/Videocam';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

import Loading from '../PostForm/Loading'

import './PostListItem.scss'
import axios from '../../axios-instance';

export default function PostListItem(props) {

  const { id, title, interest_id, upload_file, post_type, user_id, interests, users, likeCounts, thumbnails, setReload, dbUser } = props;

  const [mode, setMode] = useState("");

  let interest = "";
  for (let interestObj of interests) {
    if (interestObj.id === interest_id) {
      interest = interestObj.name
    }
  }

  let userName = "";
  for (let userObj of users) {
    if (userObj.id === user_id) {
      userName = userObj.username
    }
  }

  let likes = 0; 
  let comments = 0;
  for (let likesObj of likeCounts) {
    if (Number(Object.keys(likesObj)[0]) === id) {
      likes = likesObj[id][0];
      comments = likesObj[id][1];
    }
  }

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
        {(dbUser.id == user_id) && 
          <div className="delete-post-icon">
            <ClearIcon fontSize={"large"} onClick={deletePost}/>
          </div>
        }
          <CardMedia 
            component="img"
            height="200"
            image={thumbnails[id]}
            alt="content card"
          />
          
          <CardContent>
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
                <FavoriteIcon className="heart-icon" sx={{fontSize: 18}}/>&nbsp;{likes} &nbsp;&nbsp;&nbsp;<ChatIcon sx={{fontSize: 18}}/> &nbsp;{comments}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>}
      </Card>
      <Outlet/>
    </Link>
  );
}