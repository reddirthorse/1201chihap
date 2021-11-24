/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form } from 'react-bootstrap';
import { Button,FormControl,Container } from 'react-bootstrap';
import { Navibar, DaeMoon ,Footer } from './frame.js';
import axios from 'axios';
import { UserInput } from './userInput.js';
import { 휴게소날씨정보, Weather } from './Weather.js'; import './Weather.css'; 
import './App.css';
import { Message, UI } from './Message.js'; //import './Message.css'

function App() {
  let[날씨Data, 날씨Data변경] = useState([]);

  const [message, setMessage] = useState([]);

  let[갱신, 갱신값변경] = useState(true);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(null);


  useEffect( () => {
    const url = `http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=4047313059&type=json&numOfRows=5&pageNo=${pageNo}&pagingYn=Y`
    axios.get(url)
    .then( (res) => {
        const data = res.data.realTimeSMSList;
        const pageS = res.data.pageSize;
        setPageSize(pageS)      // 페이지사이즈 세팅
        
        // 콘솔로그 테스트
        console.log(pageS)
        console.log(data[0].smsText)

        setMessage(data);       // 데이터 세팅
    })
    .catch(() => {
        console.log('서버반응 없음')
    })
  },[])
  

  const nextPage = () => {
    const nextPage = pageNo + 1
    nextPage <= pageSize ? setPageNo(nextPage) : setPageNo(pageNo)
    console.log(pageNo)
  }

  const prevPage = () => {
    const prevPage = pageNo - 1
    prevPage > 0 ? setPageNo(prevPage) : setPageNo(pageNo)
    console.log(pageNo)
  }

  return (
    <div className="App">
      
      <Navibar />

      <DaeMoon />

      <main className="container">
        <br/>
        <UserInput />  
        
        <휴게소날씨정보 날씨Data변경 ={날씨Data변경} 갱신값변경={갱신값변경} />
        <Weather 날씨Data={날씨Data}/>

        <br/>
        
        <Message message={message} nextPage={nextPage} prevPage={prevPage}></Message>


      </main>

      <Footer />
      
    </div>
  );
}

export default App;
