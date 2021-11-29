import React from 'react';

export default function NewComment(props) {
  const { comment, setComment, submitComment } = props;

  return (
    <div className="wrapper">
      <h1>Comment Section</h1>
      <form onSubmit={event => event.preventDefault()} >
        <fieldset>
          <label>
            <input 
              name="comment" 
              type="text"
              placeholder="Write comment here"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          <button type="submitComment" onClick={submitComment}>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}