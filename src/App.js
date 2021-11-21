import React from 'react';
import './App.css';
import PostList from './components/Posts/PostList';
import NavBar from './components/Nav/NavBar';

function App() {
  return (
    <div className="App">
      < NavBar />
      < PostList />
    </div>
  );
}

export default App;
