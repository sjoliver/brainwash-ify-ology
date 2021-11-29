import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchImage } from "../../helpers/userHelpers";

const Profile = (props) => {
  const { dbUser } = props;
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={fetchImage(dbUser, true)} alt={dbUser.username} />
        <h2>{dbUser.username}</h2>
      </div>
    )
  );
};

export default Profile;