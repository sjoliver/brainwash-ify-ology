import React from "react";

const Loading = function() {
  return (
    <section className="postform--status">
      <img
        className="postform__status-image"
        src="/images/status.png"
        alt="Loading"
      />
      <h1>Loading Files</h1>
    </section>
  )
}

export default Loading;