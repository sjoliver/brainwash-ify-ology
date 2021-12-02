import React from 'react';
import Avatar from '@mui/material/Avatar';

export default function ImageAvatars(props) {
  const { fetchImage, dbUser } = props;

  return (
    <Avatar alt={dbUser.username} src={fetchImage(dbUser, false)} sx={{ width: 33, height: 33 }}/>
  );
}