import React from 'react';

export default function PostListItem(props) {

  const { title, interest_id, upload_file, interests, post_type } = props;

  let interest = "";
  for (let interestObj of interests) {
    if (interestObj.id === interest_id) {
      interest = interestObj.name
    }
  }

  return (
    <div className="post-card">
      <img style={{height:"360px"}} className="post-thumbnail" src={upload_file} alt="content card"/>
      <h4>{interest}: {title}</h4>
    </div>
  );
}  