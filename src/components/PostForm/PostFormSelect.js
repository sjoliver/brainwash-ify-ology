import React from 'react'
import PostFormSelectOption from './PostFormSelectOption';

export default function PostFormSelect(props) {
  const { name, options, postState, onChange} = props;

  // create drop down list elements
  const optionList = options.map((option, i) => {
    return <PostFormSelectOption key={i} option={option}/>
  })

  return (
    <select name={name} value={postState}
      onChange={onChange}>
      {optionList}
    </select> 
  )
}