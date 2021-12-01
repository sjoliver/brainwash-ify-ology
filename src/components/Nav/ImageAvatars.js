import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

export default function ImageAvatars(props) {
  const { fetchImage, dbUser } = props;

  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    setRenderPage(prev => prev ? true : false)
  }, [dbUser])

  return (
    <Avatar alt={dbUser.username} src={fetchImage(dbUser, false)} sx={{ width: 33, height: 33 }}/>
  );
}