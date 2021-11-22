/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form } from 'react-bootstrap';
import { Button,FormControl,Container } from 'react-bootstrap';
import { Navibar, DaeMoon ,Footer } from './frame.js';
import { 휴게소날씨정보, Weather } from './Weather.js'; import './Weather.css';
import { Message, UI } from './Message.js'; import './Message.css'
import './App.css';

function App() {
  let[날씨Data, 날씨Data변경] = useState([]);
  let[message, setMessage] = useState([]);
  
  return (
    <div className="App">
      
      <Navibar />

      <DaeMoon />
      
      <main className="container">
        <br/>
        <휴게소날씨정보 날씨Data변경 ={날씨Data변경} />
        <Weather 날씨Data={날씨Data}/>
        <br/>
        <Message setMessage={setMessage} />
        <UI message={message} />

      </main>

      <Footer />
      
    </div>
  );
}

export default App;
