import React from 'react';
import './App.scss';
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
