import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/GetMultiTraffic.css';

import { FaCar, FaLocationArrow } from 'react-icons/fa'

const GetMultiTraffic = (props) => {
    //수정한 부분 1202/0246
    const {dataSumList,detail,cityList} = props

    console.log(props)

    // const tollDic = {'서울':'101','대전':'115','북대구':'129',
    // '경산':'131','건천':'133','부산':'140','풍세하':'612','논산':'155',
    // '남논산':'608','천안':'108','광주':'167'}

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
    //수정한 부분 12/02/11:53
    const nullCheck = (detail) =>{
        for(let i  = 0; i<detail.length; i++)
       {if (detail.timeAvg === '-1'){
           return '-1'
       }}
        
    }
    console.log(cityList)

//수정한부분 useeffect 삭제 12/02/02:47

    //중간 경로 누락 발생 시 누락 경고
    if(cityList.length !== detail.length || nullCheck ==='-1'){
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
                            <p className="text-center fs-3 fw-bold text-warning">중간집계 누락 구간 발생</p>
                            <p className="text-center fs-4 fw-bold text-muted" >실시간 데이터다 보니 시시각각 누락이 생기곤 합니다. ;ㅁ;</p> 
                            <p className="text-center fs-4 fw-bold text-muted" >네이버 예상 시간으로 대체합니다.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-center fs-4 text-muted">네이버 지도 기준 예상 시간</p>
                                <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>{cityList[0].route}</p>
                            </div>
                            <div className="col">
                                <p className="text-center fs-4 text-muted">실시간 예상 시간</p>
                                <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>측정불가</p>
                            </div>
                        </div>
                    </div>
                    <div className="col border">
                    <p className="text-center text-muted fs-6">도로교통공사 Open API를 사용하여 실시간으로 시간을 측정합니다.</p>
                    <p className="text-start text-muted fs-6"> ＊ API가 실시간으로 업데이트 되기 때문에 공사 측의 누락으로 데이터 누락이 발생할 수 있습니다.</p>
                    <p className="text-start text-muted fs-6"> ＊ 누락 데이터 발생시 네이버 예상시간으로 대체합니다.</p>
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
                                <p className="text-center fs-1" style={{fontSize: "1.2em", fontWeight: "bold"}}>실시간 평균 예상 시간</p>
                            </div>
                            
                            <p className="text-center fs-1 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[0])}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="text-center fs-4 text-muted">실시간 최대 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[1])}</p>
                        </div>
                        <div className="col">
                            <p className="text-center fs-4 text-muted">실시간 최소 예상 시간</p>
                            <p className="text-center fs-4 fw-bold" style={{color:"#0DCAF0"}}>{timeCal(dataSumList[2])}</p>
                        </div>
                    </div>
                </div>
                <div className="col border">
                <p className="text-start text-muted fs-6"> ＊ 도로교통공사 Open API를 사용하여 실시간으로 시간을 측정합니다.</p>
                <p className="text-start text-muted fs-6"> ＊ API가 실시간으로 업데이트 되기 때문에 공사 측의 누락으로 데이터 누락이 발생할 수 있습니다.</p>
                <p className="text-start text-muted fs-6"> ＊ 누락 데이터 발생시 네이버 예상시간으로 대체합니다.</p>
                    <p>&nbsp;</p>
                    <p className="text-center text-muted fs-6">좋은 여행 되세요 &nbsp;<FaLocationArrow/></p>
                </div>
            </div>

        </div>

    )
}
export { GetMultiTraffic }