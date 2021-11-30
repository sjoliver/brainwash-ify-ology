import React, { useState } from 'react';
import PostListItem from './PostListItem';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './PostList.scss'

export default function PostList(props) {
  const { posts, users, interests, likeCounts, setLikeCounts, thumbnails } = props;

  const [ searchInput, setSearchInput ] = useState("");
  const [ filteredResults, setFilteredResults ] = useState([]);

  // SEARCH LOGIC // 
  const searchItems = function(searchValue) {
    setSearchInput(searchValue)
    if (searchInput !== '') {
    const filteredData = posts.filter((item) => {
      // Filtering posts according to the search term
      return (item.title).toLowerCase().includes(searchInput.toLowerCase())
    })
      setFilteredResults(filteredData);
    }
    else {
      setFilteredResults(posts)
    }
  }

  return(
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField 
            id="outlined-search" 
            label="Search" 
            type="search"
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
      </Box>
      <div className="post-list">
        {searchInput.length >= 1 ? (
          filteredResults.map((post) => {
            return (
              <PostListItem 
                key={post.id} 
                {...post}
                interests={interests}
                users={users}
                likeCounts={likeCounts} 
                setLikeCounts={setLikeCounts}
                thumbnails={thumbnails} 
              />
            )
          })
        ) : (
          posts.map((post) => {
            return (
              <PostListItem 
                key={post.id} 
                {...post}
                interests={interests}
                users={users}
                likeCounts={likeCounts} 
                setLikeCounts={setLikeCounts} 
                thumbnails={thumbnails} 
              />
            )
          })
        )}
      </div>
      <Outlet/>
    </>
  );
}