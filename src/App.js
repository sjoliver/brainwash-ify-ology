import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';
import NavBar from './components/Nav/NavBar';
import PostIndex from './components/PostIndex/PostIndex';
import PostForm from './components/PostForm/PostForm';


function App() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/interests')
      .then(res => { setInterests(() => res.data) })
      .catch(e => console.error(e))
  }, []);

  return (
    <div className="App">
      < NavBar />
      < PostForm interests={interests}/>
      < PostIndex interests={interests}/>
    </div>
  );
}

export default App;
