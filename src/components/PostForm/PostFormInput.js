import { FormControl } from '@mui/material';
import React from 'react'
import { FormControl } from '@mui/material/FormControl';
import { TextField } from '@mui/material';

export default function PostFormInput(props) {
  const { name, label, sx, required, multiline, rows, post, setPost} = props;

  return (
    <FormControl fullwidth sx={sx}>
      <TextField
        required={required}
        multiline={multiline}
        rows={rows}
        label={label}
        name={label.toLowerCase()}
        value={post[field.toLowerCase()]}
        onChange={event => 
          setPost(prev => {
            return {
              ...prev,
              [field.toLowerCase()]: event.target.value
            }
          })
        }
        />
    </FormControl>
  )
}