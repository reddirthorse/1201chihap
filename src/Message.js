import { Carousel, Button, Badge, Table } from "react-bootstrap";
import './CSS/Message.css'

import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";  // Font Awesome에서 아이콘 가져오기


const Message = ({ msg, prevPage, nextPage, pageSize_h, pageNo_h, nextTen, prevTen, sortMessage }) => {

  // 캐러셀 컬러 변경함수
  const imgColor = (index) => {

    const type = msg[index].accType
    let backColor = null;

    switch (type) {
      case "이벤트/홍보":

        backColor = (
          <img
            className="w-100 d-block"
            src="img/event.png"
            alt="slide"
            style={{ opacity: '0.5', objectFit: 'cover' }}
          />
        )
        break;

      case "강우":
      case "작업":
      case "강풍":
      case "장애물":
        backColor = (
          <img
            className="w-100 d-block"
            src="img/weather.png"
            alt="slide"
            style={{ opacity: '0.5', objectFit: 'cover' }}
          />
        )
        break;

      // 차량증가/정체, 고장, 사고
      default:
        backColor = (
          <img
            className="w-100 d-block"
            src="img/warning.png"
            alt="slide"
            style={{ opacity: '0.3', objectFit: 'cover' }}
          />
        )
    }
    return backColor;
  }

  // 시간 자르기
  const loadHour = (index) => {
    const hour = msg[index].accHour;

    const hourResult = hour.split(":");

    return hourResult[0] + '시 경';
  }

  const carousel_sort = {
    // fontWeight: 'bold',
    color: 'gray',
    margin: '5px',
    paddingBottom: '10px',

  }

  // 캐러셀 본체
  const CarouselUI = msg.map((m, index) => {
    return (

      <Carousel.Item key={index}>
        {imgColor(index)}
        <Carousel.Caption>
          <p className="mb-auto" style={carousel_sort}>{m.accType}</p>
          <div className="mb-1" style={{ fontSize: '1.15em', color: 'black' }}>{m.smsText !== undefined ? m.smsText : `${m.roadNM} ${m.startEndTypeCode} ${m.accType}`}</div>

          <p className="mb-auto" style={{ fontWeight: 'bold', color: 'gray' }}><span>{m.accDate}</span> {loadHour(index)}</p>

        </Carousel.Caption>
      </Carousel.Item>
    )
  })


  // 부트스트랩 뱃지 결정함수
  const badgeUI = (accType) => {

    const text = accType;
    let badge = null;

    const badgeStyle = {
      marginLeft: '3px',
      marginRight: '5px',
    }

    switch (text) {
      case "이벤트/홍보":
        badge = (
          <Badge bg="info" style={badgeStyle}>Info</Badge>
        )
        break;

      case "강우":
      case "작업":
      case "강풍":
      case "장애물":
        badge = (
          <Badge bg="warning" text="dark" style={badgeStyle}>Warning</Badge>
        )
        break;

      default:
        badge = (
          <Badge bg="danger" style={badgeStyle}>Issue</Badge>
        )
    }
    return badge;
  }



  // 우측 리스트
  const MessageUI = msg.map((msg, index) => {
    return (
      // <div key={index} className="list_area_m">
      /* <div className="text_control_m">
          {badgeUI(msg.accType)}&nbsp;{msg.smsText}
      </div> */
      <tr key={index}>
        <td style={{ verticalAlign: 'middle' }}>
          {badgeUI(msg.accType)}
        </td>
        <td>
          {msg.smsText !== undefined ? msg.smsText : `${msg.roadNM} ${msg.startEndTypeCode} ${msg.accType}`}
        </td>
      </tr>
      // </div>
    )
  })



  // 전체 틀
  return (
    <div className="col-md-12">
      <div className="main_container row col-md-12">
        <div className="direction_message">
          실시간 문자정보 현황
        </div>
        <Carousel className="col-md-6">
          {CarouselUI}
        </Carousel>

        <div className="col-md-6 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm">
          <div className='card border-light'>
            <Table striped hover size="sm">
              <tbody>
                {MessageUI}
              </tbody>
            </Table>
          </div>
          <div>
            <Button onClick={prevTen} variant="secondary" size="sm" className="m-1"><FaAngleDoubleLeft/></Button>
            <Button onClick={prevPage} variant="secondary" size="sm" className="m-1">Prev</Button>&nbsp;{pageNo_h} / {pageSize_h}&nbsp;
            <Button onClick={nextPage} variant="secondary" size="sm" className="m-1">Next</Button>
            <Button onClick={nextTen} variant="secondary" size="sm" className="m-1"><FaAngleDoubleRight/></Button>
            <Button onClick={sortMessage} variant="info" size="sm" className="m-2">최신순</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Message }