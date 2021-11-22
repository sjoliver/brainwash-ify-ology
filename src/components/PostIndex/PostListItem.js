import React from 'react';

export default function PostListItem(props) {
  const { title, interest_id, upload_file } = props;

  return (
    <div className="post-card">
      <img style={{width:"200px"},{height:"360px"}} className="post-thumbnail" src={upload_file} alt="content card"/>
      <h4>{title}</h4>
    </div>
  );
} 