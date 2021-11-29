import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';


export default function NewComment(props) {
  const { comment, setComment, submitComment } = props;

  return (
    <div className="new-comment">
      <form onSubmit={event => event.preventDefault()} >
          <label>
            <TextField 
              id="standard-basic" 
              label="Would you like to comment?" 
              variant="standard"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        
          <Button type="submitComment" className="new-comment__submit" onClick={submitComment}>Submit</Button>
      </form>
    </div>
  )
}