import React from 'react';
import './App.scss';
import NavBar from './components/Nav/NavBar';
import PostIndex from './components/PostIndex/PostIndex';
import PostForm from './components/PostForm/PostForm';


function App() {
  return (
    <div className="App">
      < NavBar />
      < PostForm />
      < PostIndex />
    </div>
  );
}

export default App;
