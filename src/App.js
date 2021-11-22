import React from 'react';
import './App.css';

import PostIndex from './components/PostIndex/PostIndex';
import PostForm from './components/PostsForm/PostForm';

function App() {
  return (
    <div className="App">
      < PostForm />
      < PostIndex />
    </div>
  );
}

export default App;
