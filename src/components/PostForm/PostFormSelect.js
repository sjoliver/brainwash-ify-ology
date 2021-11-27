import React from 'react'
import PostFormSelectOption from './PostFormSelectOption';

export default function PostFormSelect(props) {
  const { name, options, postState, onChange, interestIDs} = props;

  // create drop down list elements
  const optionList = options.map((option, i) => {
    return name === "interest_name" ? <PostFormSelectOption key={i} option={option} value={interestIDs[i]}/> : <PostFormSelectOption key={i} option={option}/>
  })

  return (
    <select name={name} value={postState}
      onChange={onChange}>
      <option value={""}>{"<select>"}</option>
      {optionList}
    </select> 
  )
}