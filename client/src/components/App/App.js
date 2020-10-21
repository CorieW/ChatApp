import React, { useState } from 'react';
import Register from '../Register/Register';
import Home from '../Home/Home';
import './App.css';

export default function App() {
  let [username, setUsername] = useState('');

  function onRegister(username)
  {
    setUsername(username);
  }

  if(username.length > 0)
    return (
      <div className='App'>
        <Home userData={{ username: username }}/>
      </div>
    );
  else
    return (
      <div className='App'>
        <Register onRegister={ onRegister } />
      </div>
    );
}