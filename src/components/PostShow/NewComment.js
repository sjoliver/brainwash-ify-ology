import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';


export default function NewComment(props) {
  const { comment, setComment, submitComment } = props;

  return (
    <>
      <div className="new-comment">
        <div>
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
          </form>
        </div>
        <div className="submit-comment">
        <Button type="submit" variant="contained" className="new-comment__submit" onClick={submitComment}>Submit</Button>
      </div>
      </div>
    </>
  )
}