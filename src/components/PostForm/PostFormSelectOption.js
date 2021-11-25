import React from 'react';

export default function PostFormSelectOption(props) {
  const { option } = props;

  return <option value={option==="<select>" ? "" : option}>{option}</option>
}