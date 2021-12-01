import React, { useState } from 'react';
import { Tabs, Tab, Sonnet } from 'react-bootstrap';
import './CSS/Weather.css'

const Weather = (props) => {
  let today = new Date()
  // let year = today.getFullYear() // 년도
  // let month = today.getMonth() + 1  // 월
  // let date = today.getDate()  // 날짜
  // let hours = today.getHours()
  // console.log(month)
  // console.log(date)
  const routeName = props.routeName
  const srtYvalue = props.srtYvalue
  const endYvalue = props.endYvalue
  const updownCode = props.updownCode
  const data = props.weather

  let wetherBack = 'lightblue'


  const weatherUI =
    data
      .filter(data => {
        return (
          (data.routeName === routeName)
          && (data.updownTypeCode === updownCode)
          && (updownCode === 'S' ? (data.yValue <= srtYvalue)&&(data.yValue >= endYvalue):(data.yValue <= endYvalue)&&(data.yValue >= srtYvalue) )
        )
      })
      .map((data, i) => {
        return (
          <Tab eventKey={String(i)} key={i} title={(data.unitName).split('휴게소')[0]}>

            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success"><h3> {data.unitName} </h3></strong>
                <h3 className="mb-1">{data.routeName}</h3>
                <div className="mb-1 text-muted">주소 : {data.addr}</div>
                <p className="mb-auto">노선번호 :{data.routeNo}</p>
                <p className="mb-auto">측정시각 :{data.sdate.substring(0, 4)}년{' '}
                  {data.sdate.substring(4, 6)}월{' '}
                  {data.sdate.substring(6, 8)}일{' '}
                  {data.stdHour} 시</p>
              </div>

              {/* <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm" style={{ backgroundColor:'lightblue'}}> */}
              <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm" style={{ backgroundColor: (data.weatherContents === '맑음' ? wetherBack = 'lightblue' : wetherBack = 'lightgray') }}>
                <h6> Whether </h6>
                <div className='card mx-auto' style={{ backgroundColor: 'lightblue' }}>
                  {/* <h5 style={{backgroundColor:'lightblue'}}> {dat[i].weatherContents}</h5> */}
                  {data.weatherContents === '약한소나기' && <div className="rainy"></div>}
                  {data.weatherContents === ('구름많음'||'구름조금'||'연무'||'박무'||'흐림'||'비끝남') && <div className="cloudy"></div>}
                  {data.weatherContents === '맑음' && <div className="sunny"></div>}
                </div>
                {/* <div className="temp" style={{position:'left',display:'table-cell',verticalAalign:'buttom'}}> */}
                <div className="temp">
                  <h2> </h2>
                  <h4> {data.weatherContents} </h4>
                  <h2> {parseInt(data.tempValue.substring(0, 3)) > -10 ? data.tempValue.substring(0, 2) : "--"}℃</h2>
                </div>
              </div>
            </div>
          </Tab>
        )
      })


  return (
    <div className="col-md-12">

      <Tabs defaultActiveKey="0" id="wether-tab" className="mb-3" variant="tabs">
        {/* <Tabs defaultActiveKey="0" id="wether-tab" className="mb-3" variant="pills" style={{Color:"lightpink"}}> */}
        {/* {props.날씨Data.map(function(글, i){ */}
        {weatherUI}
      </Tabs>
    </div>
  )
}
export { Weather }
