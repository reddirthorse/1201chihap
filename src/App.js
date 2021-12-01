/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navibar, DaeMoon, Footer } from './frame.js';
import axios from 'axios';
import { UserInput } from './UserInput.js';
import { Weather } from './Weather.js';
import './CSS/Weather.css';
import './CSS/App.css';
import { Message } from './Message.js';
import './CSS/Message.css'
import Loading from './Loading'
import { RepFood } from './RepFood'
import { Input } from './Input'
import { GetMultiTraffic } from './GetMultiTraffic'

function App() {
  // 공용
  const [isLoading, setIsLoading] = useState(true)

  // 한울
  const [message, setMessage] = useState([]);             // 메세지 배열 realTimeSMSList
  const [pageSize_h, setPageSize_h] = useState(null);     // 1페이지당 5개항목 기준으로 총 페이지수
  const [pageNo_h, setPageNo_h] = useState(1);            // 현재 페이지 번호
  const [sortBy, setSortBy] = useState('desc');           // 날짜별 최신순,오래된순 변경

  // 성빈
  const [routeCode, setRouteCode] = useState('')
  const [foodData, setFoodData] = useState([])
  const [numOfRows_s, setNumOfRows_s] = useState(99)
  const [direction, setDirection] = useState('')
  const [routeName, setRouteName] = useState('')

  // 상재
  const [weather, setWeather] = useState([]);

  // 11/30 추가


  let [rdApi, rdApi변경] = useState(false);
  let [갱신, 갱신값변경] = useState(true);
  let [갱신2, 갱신값변경2] = useState(true);
  const [start, setStart] = useState('대구');
  const [end, setEnd] = useState('서울');

  const handleClick = (e) => {
    const { name, value } = e.target
    setRouteCode(name)
    setDirection(value)
    console.log(name, value)
    console.log(routeCode, direction)
  }

  // 성우
  const [inputs, setInputs] = useState({
    startCity: '',
    endCity: ''
  })
  const [startList, setStartList] = useState([]);
  const [endList, setEndList] = useState([])


  const { startCity, endCity } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });

  }

  // 인증키
  const API_KEY = process.env.REACT_APP_API_KEY


  // 한울 useEffect
  useEffect(async () => {

    const url = `http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=${API_KEY}&type=json&sortType=${sortBy}&numOfRows=5&&pagingYn=Y&pageNo=`

    try {

      let n = pageNo_h;

      const res = await axios.get(url + n.toString());
      const data = res.data.realTimeSMSList;
      const pageS = res.data.pageSize;

      // 홍보/이벤트 smsText 에 붙어있는 ** 제거
      for (var i = 0; i < 5; i++) {
        let tmp = data[i].smsText.split("**")[1];
        data[i].smsText = tmp;
      }

      setMessage(data);
      setPageSize_h(pageS);

    } catch (err) {
      console.log(err + "!!!!")
    }
  }, [pageNo_h, sortBy])   // 이부분 수정필요

  // 한울 함수
  const nextPage = () => {   // 다음으로 한칸이동
    const nextPage = pageNo_h + 1
    nextPage <= pageSize_h ? setPageNo_h(nextPage) : setPageNo_h(pageNo_h)
    console.log(pageNo_h)

  }

  const prevPage = () => {   // 이전으로 한칸이동
    const prevPage = pageNo_h - 1
    prevPage > 0 ? setPageNo_h(prevPage) : setPageNo_h(pageNo_h)
    console.log(pageNo_h)
  }

  const nextTen = () => {    // 다음으로 10칸이동
    const nextPage = pageNo_h + 10
    nextPage <= pageSize_h ? setPageNo_h(nextPage) : setPageNo_h(pageSize_h)
    console.log(pageNo_h)
  }

  const prevTen = () => {    // 이전으로 10칸이동
    const prevPage = pageNo_h - 10
    prevPage > 0 ? setPageNo_h(prevPage) : setPageNo_h(1)
    console.log(pageNo_h)
  }

  const sortMessage = () => {
    const ascORdesc = sortBy
    ascORdesc !== 'desc' ? setSortBy('desc') : setSortBy('asc')
    console.log(sortBy)
  }



  // 성빈 useEffect
  useEffect(async () => {
    const url = `http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&routeCode=${routeCode}&numOfRows=${numOfRows_s}&pageNo=`
    const temp = []
    try {
      for (var i = 0; i < 3; i++) {
        const res = await axios.get(url + (i + 1).toString())
        const data = res.data.list
        temp.push(...data)
      }

      setFoodData(temp)
      setIsLoading(false)

    } catch (err) {
      console.log('Food ERROR', err)
    }
  }, [routeCode])

  // 성빈 useEffect 2
  useEffect(async () => {
    switch (start) {
      case '서울':
        switch (end) {
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            break;
          case '대구':
            setDirection('부산')
            setRouteCode('0010')
            break;
          case '광주':
            setDirection('광주')
            setRouteCode('0010')
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            break;
        }
      case '부산':
        switch (end) {
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            break;
          case '대구':
            setDirection('서울')
            setRouteCode('0010')
            break;
          case '광주':
            setDirection('광주')
            setRouteCode('0010')
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            break;
        }
      case '대구':
        switch (end) {
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            break;
          case '광주':
            setDirection('광주')
            setRouteCode('0122')
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            break;
        }
      case '대전':
        switch (end) {
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            break;
          case '광주':
            setDirection('광주')
            setRouteCode('0010')
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            break;
        }
      case '광주':
        switch (end) {
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            break;
          case '대구':
            setDirection('대구')
            setRouteCode('0122')
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            break;
        }
    }
    // console.log(direction, routeCode)
  }, [start, end])

  // 상재 useEffect
  useEffect(async () => {
    const url = `https://data.ex.co.kr/openapi/restinfo/restWeatherList?key=${API_KEY}&type=json&sdate=20211121&stdHour=18`
    try {
      const res = await axios.get(url)
      const data = res.data.list[0]
      setWeather(data)
    } catch {
      console.log('Weather ERROR')
    }
  }, [])



  // 성우 useEffect
  useEffect(() => {
    //경부 고속도로 하행선 시작
    if (startCity === '서울' && endCity === '대전') {
      setStartList(['101'])
      setEndList(['115'])
    } else if (startCity === '서울' && endCity === '대구') {
      setStartList(['101'])
      setEndList(['129'])
    } else if (startCity === '서울' && endCity === '부산') {
      setStartList(['101', '129', '131', '133'])
      setEndList(['129', '131', '133', '140'])
    } else if (startCity === '대전' && endCity === '대구') {
      setStartList(['115'])
      setEndList(['129'])
    } else if (startCity === '대전' && endCity === '부산') {
      setStartList(['115', '129', '131', '133'])
      setEndList(['129', '131', '133', '140'])
    } else if (startCity === '대구' && endCity === '부산') {
      setStartList(['131', '133'])
      setEndList(['133', '140'])
    }
    //경부 고속 도로 하행선 종료
    //경부 고속도로 상행선 시작
    else if (startCity === '부산' && endCity === '대구') {
      setStartList(['133', '140'])
      setEndList(['131', '133'])
    } else if (startCity === '부산' && endCity === '대전') {
      setStartList(['123', '131', '133', '140'])
      setEndList(['115', '123', '131', '133'])
    } else if (startCity === '부산' && endCity === '서울') {
      setStartList(['123', '131', '133', '140'])
      setEndList(['101', '123', '131', '133'])
    } else if (startCity === '대구' && endCity === '대전') {
      setStartList(['123'])
      setEndList(['115'])
    } else if (startCity === '대구' && endCity === '서울') {
      setStartList(['123'])
      setEndList(['101'])
    } else if (startCity === '대전' && endCity === '서울') {
      setStartList(['115'])
      setEndList(['101'])
    }
    // --------------------- 경부 고속도로 상행선 종료 -----------------

    //광주 관련 도로 시작

    //광주 관련 도로 종료
  }, [inputs])

  return (<div className="App" >
    <Navibar />
    <DaeMoon />
    <main>
      <br />
      {/* 사용자 입력(출발지와 도착지 받음) */}
      <UserInput start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        setIsLoading={setIsLoading}
      />

      {/* 예상도착시간 */}
      <div>
        <Input name='startCity'
          type='text'
          placeholder=''
          onChange={handleChange}>
        </Input>
        <Input name='endCity'
          type='text'
          placeholder=''
          onChange={handleChange}>
        </Input>
        <GetMultiTraffic startCity={startCity}
          endCity={endCity}
          start={startList}
          end={endList}>
        </GetMultiTraffic>
      </div>
      <br/>

      {/* 휴게소 메뉴 */}
      {isLoading ? < Loading /> :
        <RepFood
          data={foodData}
          onClick={handleClick}
          routeCode={routeCode}
          direction={direction}
          start={start}
          end={end}
        />}
      <br />
      {/* 입력받은 도착지의 날씨 */}
      <Weather weather={weather} />
      <br />

      {/* 실시간 도로 정보 */}
      <Message
        msg={message}
        pageSize_h={pageSize_h}
        pageNo_h={pageNo_h}
        nextPage={nextPage}
        prevPage={prevPage}
        nextTen={nextTen}
        prevTen={prevTen}
        sortMessage={sortMessage}
        ></Message>

    </main>

    <Footer />

  </div>
  );
}

export default App;