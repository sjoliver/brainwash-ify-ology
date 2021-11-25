import React, { useState } from 'react';
import PostListItem from './PostListItem';
import { Outlet } from 'react-router-dom';

import './PostList.scss'

export default function PostList(props) {
  const { posts, users, interests, likeCounts, setLikeCounts } = props;

  const [ searchInput, setSearchInput ] = useState("");
  const [ filteredResults, setFilteredResults ] = useState([]);

  // const deleteData = function() {
  //   axios
  //     .delete('http://localhost:3000/posts/3')
  //     .then(res => console.log(res))
  //     .catch(e => console.error(e))
  // }

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
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
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
              />
            )
          })
        )}
      </div>
      <Outlet/>
    </>
  );
}