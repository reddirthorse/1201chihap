import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CSS/GetMultiTraffic.css';

import { FaCar, FaLocationArrow } from 'react-icons/fa'

const GetMultiTraffic = (props) => {
    //수정한 부분 1202/0246
    const {dataSumList,detail,cityList} = props

    console.log(props)

    function timeCal(t) {
        let minutes = 0;
        let hour = 0;
        if (3600 > t) {
            minutes = parseInt(t / 60)
            return `${minutes}분`
        }
        else if (t >= 3600) {
            hour = parseInt(t / 3600)
            minutes = parseInt((t - hour * 3600) / 60)
            return `${hour}시간 ${minutes}분`
        }
    }
//수정한부분 useeffect 삭제 12/02/02:47
    
    if(cityList.length !== detail.length){
        return (
            <div className="traffic-container">
                
                <div className="row">
                    <div className="col border" style={{fontSize: "1.2em", fontWeight: "bold"}}>
                        <div className="row">
                            <p className="text-center fs-1 text-muted">{props.start}</p>
                        </div>
                        <div className="row">
                            <p>&nbsp;</p>
                            <FaCar size="40"/>
                            <p>&nbsp;</p>
                        </div>
                        <div className="row">
                            <p className="text-center fs-1 text-muted">{props.end}</p>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row border">
                            <div className="col">
                            <p className="text-center fs-4 text-muted">중간집계 누락 구간 발생</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-center fs-4 text-muted">최대 예상 시간</p>
                                <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>측정불가</p>
                            </div>
                            <div className="col">
                                <p className="text-center fs-4 text-muted">최소 예상 시간</p>
                                <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>측정불가</p>
                            </div>
                        </div>
                    </div>
                    <div className="col border">
                     {detail.map((d,cnt)=>{
                        <p className="text-center text-muted fs-6">{detail[cnt].sCity}</p>})}
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p className="text-center text-muted fs-6">좋은 여행 되세요 &nbsp;<FaLocationArrow/></p>
                    </div>
                </div>
        
                </div>
        
            )

        }
    
    

    console.log(dataSumList)
    return (
        <div className="traffic-container">
            {/* <strong className="d-inline-block mb-2 text-success">출발 : {props.startCity}</strong>
        <div className = 'endCity'>도착 : {props.endCity}</div> */}
            <div className="row">
                <div className="col border" style={{fontSize: "1.2em", fontWeight: "bold"}}>
                    <div className="row">
                        <p className="text-center fs-1 text-muted">{props.start}</p>
                    </div>
                    <div className="row">
                        <p>&nbsp;</p>
                        <FaCar size="40"/>
                        <p>&nbsp;</p>
                    </div>
                    <div className="row">
                        <p className="text-center fs-1 text-muted">{props.end}</p>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row border">
                        <div className="col">
                            <div className="Traffic-area">
                                <p className="text-center fs-1" style={{fontSize: "1.2em", fontWeight: "bold"}}>평균 예상 시간</p>
                            </div>
                            
                            <p className="text-center fs-1 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[0])}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="text-center fs-4 text-muted">최대 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[1])}</p>
                        </div>
                        <div className="col">
                            <p className="text-center fs-4 text-muted">최소 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[2])}</p>
                        </div>
                    </div>
                </div>
                <div className="col border">
                {detail.map((d,cnt)=>{
                    <p className="text-center text-muted fs-6">{detail[cnt].sCity}</p>})}
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p className="text-center text-muted fs-6">좋은 여행 되세요 &nbsp;<FaLocationArrow/></p>
                </div>
            </div>

        </div>

    )
}
export { GetMultiTraffic }