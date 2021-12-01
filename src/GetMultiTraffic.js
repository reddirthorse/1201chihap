import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CSS/GetMultiTraffic.css';

import { FaCar, FaLocationArrow } from 'react-icons/fa'

const GetMultiTraffic = (props) => {
    const [dataSumList, setDataSumList] = useState([])


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


    useEffect(() => {
        const { startList, endList } = props
        let tempDataList = []
        let sumTimeAvg = 0
        let sumTimeMax = 0
        let sumTimeMin = 0
        try {
            async function getTraffics() {
                for (let i = 0; i < startList.code.length; i++) {
                    const data = await axios.get(`http://data.ex.co.kr/openapi/odhour/trafficTimeByRoute?key=6844121548&type=json&startUnitCode=${startList.code[i]}&endUnitCode=${endList.code[i]}`)
                    const { list } = data.data
                    for (let j = 0; j < list.length; j++) {
                        if (list[j].startUnitCode === `${startList.code[i]} ` && list[j].endUnitCode === `${endList.code[i]} ` && list[j].carType === '1') {
                            tempDataList.push({ 'carType': list[j].carType, 'startUnitCode': list[j].startUnitCode, 'endUnitCode': list[j].endUnitCode, 'timeAvg': list[j].timeAvg, 'timeMax': list[j].timeMax, 'timeMin': list[j].timeMin, 'sumTm': list[j].sumTm });
                        }
                    }
                }
                for (let j = 0; j < tempDataList.length; j++) {
                    sumTimeAvg = sumTimeAvg + parseInt(tempDataList[j].timeAvg)
                    sumTimeMax = sumTimeMax + parseInt(tempDataList[j].timeMax)
                    sumTimeMin = sumTimeMin + parseInt(tempDataList[j].timeMin)
                }
                setDataSumList([sumTimeAvg, sumTimeMax, sumTimeMin])
            }
            getTraffics()
        }
        catch (e) {
            console.log('err')
        }

    }, [props])

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
                            
                            <p className="text-center fs-1 fw-bold" style={{color: '#198753'}}>{timeCal(dataSumList[0])}</p>
                        </div>
                    </div>
                    <div className="row border">
                        <div className="col">
                            <p className="text-center fs-4 text-muted">최대 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color: '#198753'}}>{timeCal(dataSumList[1])}</p>
                        </div>
                        <div className="col">
                            <p className="text-center fs-4 text-muted">최소 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color: '#198753'}}>{timeCal(dataSumList[2])}</p>
                        </div>
                    </div>
                </div>
                <div className="col border">
                    <p className="text-center text-muted fs-6">경부고속</p>
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