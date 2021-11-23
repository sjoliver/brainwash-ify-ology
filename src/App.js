import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';
import NavBar from './components/Nav/NavBar';
import PostIndex from './components/PostIndex/PostIndex';
import PostForm from './components/PostForm/PostForm';
import PostShow from './components/PostShow/PostShow';


function App() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/interests')
      .then(res => { setInterests(() => res.data) })
      .catch(e => console.error(e))
  }, []);
  
  // < PostForm interests={interests}/>
  // < PostIndex interests={interests}/>
  return (
    <div className="App">
      < NavBar />
     

      < PostShow />
    </div>
  );
}

export default App;
