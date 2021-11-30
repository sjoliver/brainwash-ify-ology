import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';


export default function NewComment(props) {
  const { comment, setComment, submitComment } = props;

  return (
    <div className="new-comment">
      <form onSubmit={event => event.preventDefault()} >
          <label>
            <TextField color="grey"
              id="standard-basic" 
              label="Leave a comment..." 
              variant="standard"
              InputProps={{ disableUnderline: true }}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        
          <Button type="submitComment" variant="outlined" className="new-comment__submit" onClick={submitComment}>Submit</Button>
      </form>
    </div>
  )
}