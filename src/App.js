/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form } from 'react-bootstrap';
import { Button,FormControl,Container } from 'react-bootstrap';
import { Navibar, DaeMoon ,Footer } from './frame.js';
import { 휴게소날씨정보, Weather } from './Weather.js'; import './Weather.css';
import Message from './Message.js'; import './Message.css'
import './App.css';
import axios from 'axios';

function App() {
  let [날씨Data, 날씨Data변경] = useState([]);
  const [message, setMessage] = useState([]);
  // const [doro, setDoro] = useState('');

  useEffect (() => {
    // const url = 'http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=4047313059&type=json&numOfRows=5&pageNo=1&pagingYn=Y'
    const url = 'http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=4047313059&type=json&pagingYn=N'
    axios.get(url)
        .then( (res) => {
            const data = res.data.realTimeSMSList;
            // const temp = []
            // for(var i=0; i<data.length; i++) {
            //     if(data.roadNM === '경부선') {
            //         const temp = data
            //     } else {
            //         continue;
            //     }
            // }
            console.log(data)
            setMessage(data)
        }).catch( () => {
            console.log('서버반응 없음')
        })
  })

  return (
    <div className="App">
      
      <Navibar />

      <DaeMoon />
      
      <main className="container">
        <br/>
        <휴게소날씨정보 날씨Data변경 ={날씨Data변경} />
        <Weather 날씨Data={날씨Data}/>
        <br/>
        <Message message={message}></Message>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
