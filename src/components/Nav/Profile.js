import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchImage } from "../../helpers/userHelpers";
import { Link } from 'react-router-dom'
import ImageAvatars from "./ImageAvatars";

import './NavBar.scss'

const Profile = (props) => {
  const { dbUser } = props;
  const { isAuthenticated, isLoading } = useAuth0();

  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    setRenderPage(prev => prev ? true : false)
  }, [dbUser])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Link className="navbar__link auth-user" to={`/profile/${dbUser.id}`}>
        <p id="auth-user__username">{dbUser.username}&nbsp;&nbsp;</p>
        <ImageAvatars fetchImage={fetchImage} dbUser={dbUser} />
      </Link>
    )
  );
};

export default Profile;