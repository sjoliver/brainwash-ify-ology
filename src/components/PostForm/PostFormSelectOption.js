import React from 'react';

export default function PostFormSelectOption(props) {
  const { option, value} = props;

  return <option value={value ? value : option}>{option}</option>
}