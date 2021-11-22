import React, { useState, useEffect } from 'react';
import axios from "axios";

function Message(props) {
    
    const url = 'http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=4047313059&type=json&numOfRows=5&pageNo=1&pagingYn=Y'
    axios.get(url)
        .then( (res) => {
            const data = res.data.realTimeSMSList[0];
            // const temp = []
            // for(var i=0; i<data.length; i++) {
            //     if(data.roadNM === '경부선') {
            //         const temp = data
            //     } else {
            //         continue;
            //     }
            // }
            console.log(data)
            props.setMessage(data)
        }).catch( () => {
            console.log('서버반응 없음')
        })
    return('')
}

function UI(props) {

    return (

        <div className="col-md-12">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    {/* <strong className="d-inline-block mb-2 text-success"><h3> {props.message.accDate} - {props.message.accHour} </h3></strong>
                    <h3 className="mb-1">{props.message.accType}</h3> */}
                    <div className="mb-1 text-muted">{props.message.smsText}</div>
                    <p className="mb-auto">구분 : {props.message.accType}</p>
                    <p className="mb-auto">발생일자 : {props.message.accDate}</p>
                    
                </div>

                {/* <div class="col-auto d-none d-md-block"> */}
                <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm">

                    <div className='card mx-auto'>
                        {/* <img src="./logo192.png" class="card-img" alt=""/> */}
                        <p>컨텐츠</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Message, UI }