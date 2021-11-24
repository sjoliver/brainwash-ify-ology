import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import NavBar from './components/Nav/NavBar';
import PostIndex from './components/PostIndex/PostIndex';
import PostForm from './components/PostForm/PostForm';
import PostShow from './components/PostShow/PostShow';

function App() {
  const [dbUser, setDbUser] = useState({});
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const getInterests = function() {
      axios
        .get('http://localhost:3000/interests')
        .then(res => { setInterests(() => res.data) })
        .catch(e => console.error(e))
    }
    getInterests();
  }, []);
  
  return (
    <div className="App">
      <Router>
      <NavBar setDbUser={setDbUser}/>
        <Routes>
          <Route path={"/"} element={<PostIndex interests={interests} initialFilter={"hey"}/>}/>
          <Route path={"/posts/new"} element={<PostForm />}/>
          <Route path={"/posts/:id"} element={<PostShow dbUser={dbUser} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;