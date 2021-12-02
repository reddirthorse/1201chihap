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

import { GetMultiTraffic } from './GetMultiTraffic'

function App() {
  

  // 한울
  const [message, setMessage] = useState([]);             // 메세지 배열 realTimeSMSList
  const [pageSize_h, setPageSize_h] = useState(null);     // 1페이지당 5개항목 기준으로 총 페이지수
  const [pageNo_h, setPageNo_h] = useState(1);            // 현재 페이지 번호
  const [sortBy, setSortBy] = useState('desc');           // 날짜별 최신순,오래된순 변경

  // 성빈
  const [foodLoading, setFoodLoading] = useState(true)
  const [routeCode, setRouteCode] = useState('')
  const [routeCode2, setRouteCode2] = useState('')
  const [foodData, setFoodData] = useState([])
  const [numOfRows_s, setNumOfRows_s] = useState(99)
  const [direction, setDirection] = useState('')
  const [routeName, setRouteName] = useState('')
  const [srtYvalue, setSrtYvalue] = useState(0)
  const [endYvalue, setEndYvalue] = useState(0)
  const [updownCode, setUpDownCode] = useState('')

  // 상재
  const [weather, setWeather] = useState([]);
  const [srtCityNum, setSrtCityNum] = useState('0')
  const [endCityNum, setEndCityNum] = useState('3')

  // 11/30 추가


  let [rdApi, rdApi변경] = useState(false);
  let [갱신, 갱신값변경] = useState(true);
  let [갱신2, 갱신값변경2] = useState(true);
  const [start, setStart] = useState('서울');
  const [end, setEnd] = useState('부산');

  const handleClick = (e) => {
    const { name, value } = e.target
    setRouteCode(name)
    setDirection(value)
    console.log(name, value)
    console.log(routeCode, direction)
  }

  // 성우
  const [startList,setStartList] = useState({
    code:[],
    name:[],
    route:''
  });
  const [endList,setEndList] = useState({
    code:[],
    name:[]
  })
  //**수정한 부분 12/02 02:43
  const [dataSumList, setDataSumList] = useState([])
  const [detail,setDetail] = useState([])
  const [cityList,setCityList] = useState([])

  
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
  }, [pageNo_h, sortBy])

  // 한울 함수
  const nextPage = () => {   // 다음으로 한칸이동
    const nextPage = pageNo_h + 1
    nextPage <= pageSize_h ? setPageNo_h(nextPage) : setPageNo_h(pageNo_h)
    // console.log(pageNo_h)

  }

  const prevPage = () => {   // 이전으로 한칸이동
    const prevPage = pageNo_h - 1
    prevPage > 0 ? setPageNo_h(prevPage) : setPageNo_h(pageNo_h)
    // console.log(pageNo_h)
  }

  const nextTen = () => {    // 다음으로 10칸이동
    const nextPage = pageNo_h + 10
    nextPage <= pageSize_h ? setPageNo_h(nextPage) : setPageNo_h(pageSize_h)
    // console.log(pageNo_h)
  }

  const prevTen = () => {    // 이전으로 10칸이동
    const prevPage = pageNo_h - 10
    prevPage > 0 ? setPageNo_h(prevPage) : setPageNo_h(1)
    // console.log(pageNo_h)
  }

  const sortMessage = () => {
    const ascORdesc = sortBy
    ascORdesc !== 'desc' ? setSortBy('desc') : setSortBy('asc')

    // console.log(sortBy)
  }



  // 성빈 useEffect
  useEffect(async () => {
    const url = `http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&routeCode=${routeCode}&numOfRows=${numOfRows_s}&pageNo=`
    const temp = [] // API를 여러번 불러와서 데이터를 저장하기 위한 빈 배열
    try {
      for (var i = 0; i < 3; i++) {
        const res = await axios.get(url + (i + 1).toString())
        const data = res.data.list
        temp.push(...data)
      }

      setFoodData(temp)
      setFoodLoading(false)

    } catch (err) {
      console.log('Food ERROR', err)
    }
  }, [routeCode]) // 도로 코드가 바뀔때 마다 새로 불러옴
  // 성빈 useEffect 2
   //수정한 부분이 맞을걸?? 1202/0245 성우 async 지웠을것으로 생각
  useEffect( () => {
    switch (start) {
      case '서울':
        setSrtYvalue(37.54)
        switch (end) {
          case '광주':
            setDirection('목포')
            setRouteCode('0150')
            setRouteName('서해안선')
            setEndYvalue(35.11)
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(36.32)
            break;
          case '대구':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.90)
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.30)
            // setUpDownCode('S') // 하행
            break;
        }
        break;
      case '부산':
        setSrtYvalue(35.30)
        switch (end) {
          case '광주':
            setDirection('순천')
            setRouteCode('0100')
            setRouteName('남해선(순천-부산)')
            setEndYvalue(35.11)
            break;
          case '대구':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.90)
            break;
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(37.54)
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(36.32)
            break;
        }
        break;
      case '대구':
        setSrtYvalue(35.90)
        switch (end) {
          case '광주':
            setDirection('무안')
            setRouteCode('0122')
            setRouteCode2('0120')
            setRouteName('광주대구선')
            setEndYvalue(35.11)
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.30)
            break;
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(37.54)
            break;
          case '대전':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(36.32)
            break;
        }
        break;
      case '대전':
        setSrtYvalue(36.32)
        switch (end) {
          case '서울':
            setDirection('서울')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(37.54)
            break;
          case '광주':
            setDirection('순천')
            setRouteCode('0251')
            setRouteName('호남선')
            setEndYvalue(35.11)
            break;
          case '대구':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.90)
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0010')
            setRouteName('경부선')
            setEndYvalue(35.30)
            break;
        }
        break;
      case '광주':
        setSrtYvalue(35.11)
        switch (end) {
          case '서울':
            setDirection('시흥')
            setRouteCode('0150')
            setRouteName('서해안선')
            setEndYvalue(37.54)
            break;
          case '부산':
            setDirection('부산')
            setRouteCode('0100')
            setRouteName('남해선(순천-부산)')
            setEndYvalue(35.30)
            break;
          case '대구':
            setDirection('대구')
            setRouteCode('0122')
            setRouteName('광주대구선')
            setEndYvalue(35.90)
            break;
          case '대전':
            setDirection('논산')
            setRouteCode('0251')
            setRouteName('호남선')
            setEndYvalue(36.32)
            break;
        }
        break;
    }
    console.log(direction, routeCode)
  }, [start, end])

  // 성빈 useEffect 3
 
  useEffect(() => {
    (srtYvalue - endYvalue > 0) ? setUpDownCode('S') : setUpDownCode('E')
  },[srtYvalue, endYvalue])


  // 상재 useEffect
  useEffect(async () => {
    const url = `https://data.ex.co.kr/openapi/restinfo/restWeatherList?key=${API_KEY}&type=json&sdate=20211121&stdHour=18`
    try {
      const res = await axios.get(url)
      const data = res.data.list
      setWeather(data)
    } catch {
      console.log('Weather ERROR')
    }
  },[start, end])
  


  // 성우 useEffect
  useEffect(() =>{
    //경부 고속도로 하행선 시작
    if (start ==='서울' && end ==='대전'){
      setStartList({code:['101'],name:['서울'],route:'1시간 39분'})
      setEndList({code:['115'],name:['대전']})
    }
    else if(start ==='서울' && end ==='대구'){
      setStartList({code:['101'],name:['서울'],route:'3시간 15분'})
      setEndList({code:['129'],name:['북대구']})
    }
    else if(start ==='서울' && end ==='부산'){
      setStartList({code:['101','129','131','133'],name:['서울','북대구','경산','건천'],route:'4시간 36분'})
      setEndList({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})

    }else if(start ==='대전' && end ==='대구'){
      setStartList({code:['115'],name:['대전'],route:'1시간 57분'})
      setEndList({code:['129'],name:['북대구']})
    }
    else if(start ==='대전' && end ==='부산'){
      setStartList({code:['115','129','131','133'],name:['대전','북대구','경산','건천'],route:'3시간 37분'})
      setEndList({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})
    }
    else if(start ==='대구' && end ==='부산'){
      setStartList({code:['131','133'],name:['경산','건천'],route:'1시간 16분'})
      setEndList({code:['133','140'],name:['건천','부산']})
    }
    //경부 고속 도로 하행선 종료
    //경부 고속도로 상행선 시작
    else if (start ==='부산' && end ==='대구'){
      setStartList({code:['140','133'],name:['부산','건천'],route:'1시간 15분'})
      setEndList({code:['133','131'],name:['건천','경산']})
    }
    else if (start ==='부산' && end ==='대전'){
      setStartList({code:['140','133','131','129'],name:['부산','건천','경산','북대구'],route:'2시간 40분'})
      setEndList({code:['133','131','129','115'],name:['건천','경산','북대구','대전']})
    }
    else if (start ==='부산' && end ==='서울'){
      setStartList({code:['140','133','131','129'],name:['부산','건천','경산','북대구'],route:'4시간 38분'})
      setEndList({code:['133','131','129','101'],name:['건천','경산','북대구','서울']})
    }
    else if (start ==='대구' && end ==='대전'){
      setStartList({code:['129'],name:['북대구'],route:'1시간 34분'})
      setEndList({code:['115'],name:['대전']})
    }
    else if (start ==='대구' && end ==='서울'){
      setStartList({code:['129'],name:['대구'],route:'3시간 21분'})
      setEndList({code:['101'],name:['서울']})
    }
    else if (start ==='대전' && end ==='서울'){
      setStartList({code:['115'],name:['대전'],route:'1시간 44분'})
      setEndList({code:['101'],name:['서울']})
    }
    //경부 고속도로 상행선 종료
    //광주 관련 도로 시작
    //상행선 시작
    else if (start ==='서울' && end ==='광주'){
      setStartList({code:['101','612','608'],name:['서울','풍세하','남논산'],route:'2시간 58분'})
      setEndList({code:['108','608','167'],name:['천안','남논산','광주']})
    }
    else if (start ==='대전' && end ==='광주'){
      setStartList({code:['152','608'],name:['대전','남논산'],route:'1시간 53분'})
      setEndList({code:['155','167'],name:['논산','광주']})
    }
    else if (start ==='대구' && end ==='광주'){
      setStartList({code:['519'],name:['남대구'],route:'1시간 46분'})
      setEndList({code:['251'],name:['동광주']})
    }
    else if (start ==='부산' && end ==='광주'){
      setStartList({code:[' 244'],name:['서부산'],route:'2시간 29분'})
      setEndList({code:['251'],name:['동광주']})
    }
    //상행선 종료
    
    //하행선 시작
    else if (start ==='광주' && end ==='서울'){
      setStartList({code:['101','612','608'],name:['서울','풍세하','남논산'],route:'3시간 51분'})
      setEndList({code:['108','608','167'],name:['천안','남논산','광주']})
      
    }
    else if (start ==='광주' && end ==='대전'){
      setStartList({code:['152','608'],name:['대전','남논산'],route:'2시간 20분'})
      setEndList({code:['155','167'],name:['논산','광주']})
      
    }
    else if (start ==='광주' && end ==='대구'){
      setStartList({code:['251'],name:['동광주'],route:'1시간 46분'})
      setEndList({code:['519'],name:['남대구']})
      
    }
    else if (start ==='광주' && end ==='부산'){
      setStartList({code:['251'],name:['동광주'],route:'2시간 40분'})
      setEndList({code:['244'],name:['서부산']})
      
    }

    //하생선 종료
    //광주 관련 도로 종료
 
    
  },[start,end])
//수정한 부분 12/02/02:44
  useEffect(async()=>{
    let tempDataList = []
    let tempCityList = []
    let sumTimeAvg = 0
    let sumTimeMax = 0
    let sumTimeMin = 0
    try {for (let i = 0; i < startList.code.length; i++) {
      const data = await axios.get(`http://data.ex.co.kr/openapi/odhour/trafficTimeByRoute?key=6844121548&type=json&startUnitCode=${startList.code[i]}&endUnitCode=${endList.code[i]}`)
      const { list } = data.data
      for (let j = 0; j < list.length; j++) {
          if (list[j].startUnitCode === `${startList.code[i]} ` && list[j].endUnitCode === `${endList.code[i]} ` && list[j].carType === '1') {
              tempDataList.push({ 'carType': list[j].carType, 'startUnitCode': list[j].startUnitCode, 'endUnitCode': list[j].endUnitCode, 'timeAvg': list[j].timeAvg, 'timeMax': list[j].timeMax, 'timeMin': list[j].timeMin, 'sumTm': list[j].sumTm });
          }
      }   
  }
  for (let i = 0; i <startList.code.length;i++){
    tempCityList.push({'sCity':startList.name[i],'eCity':endList.name[i],'route':startList.route})
  }
  for (let j = 0; j < tempDataList.length; j++) {
      sumTimeAvg = sumTimeAvg + parseInt(tempDataList[j].timeAvg)
      sumTimeMax = sumTimeMax + parseInt(tempDataList[j].timeMax)
      sumTimeMin = sumTimeMin + parseInt(tempDataList[j].timeMin)
  }
  setCityList(tempCityList)
  setDataSumList([sumTimeAvg, sumTimeMax, sumTimeMin])
  setDetail(tempDataList)
  }catch (e) {
    console.log('err')
}},[startList,endList])


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
        setFoodLoading={setFoodLoading}
      />

      {/* 예상도착시간 */}
    <div>
      {/* 수정한 부분 1202/0244 */}
      <GetMultiTraffic dataSumList ={dataSumList} detail = {detail} cityList = {cityList} start = {start} end = {end}></GetMultiTraffic>
    </div>
      <br />

      {/* 휴게소 메뉴 */}
      {foodLoading ? < Loading /> :
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
      <Weather 
        weather={weather} 
        start={start}
        end={end}
        routeName={routeName}
        srtYvalue={srtYvalue}
        endYvalue={endYvalue}
        updownCode={updownCode}
        />
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
        sortBy={sortBy}
      ></Message>

    </main>

    <Footer />

  </div>
  );
}

export default App;