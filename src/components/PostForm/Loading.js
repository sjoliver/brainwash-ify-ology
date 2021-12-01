import React from "react";

const Loading = function(props) {
  const { message, element } = props
  return (
    <section className={`${element}--status`}>
      <img
        className={`${element}__status-image`}
        src="/images/status.png"
        alt="Loading"
      />
      <h1>{message}</h1>
    </section>
  )
}

export default Loading;