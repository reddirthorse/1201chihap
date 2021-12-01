import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CSS/RepFood.css'

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
    }
  `

const RepFood = (props) => {
  // 고속도로 번호, 방향
  const direction = props.direction
  const routeCode = props.routeCode
  // API에서 불러온 데이터
  const data = props.data

  // 캐러셀 옵션
  const settings = {
    dots: false, // 하단에 표시되는 점
    infinite: true, // 슬라이드 반복 여부
    speed: 500, // 페이지 넘기는 속도
    slidesToShow: 4, // 한페이지에 보이는 객체 수
    slidesToScroll: 4, // 스크롤시 넘어가는 객체 수
    arrows: false, // 넘기는 화살표
    autoplay: true, // 페이지 자동 이동
    responsive: [ // 반응형 설정
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  // 캐러셀 내용
  const foodUI =
    data
      .filter(data => {
        const batchMenu = data.batchMenu
        return (
          // 불러온 데이터 중 메뉴가 비어있는 자료 필터링
          // 데이터 중 입력창에 선택한 방향, 도로 코드와 같은 자료들만 필터링
          (batchMenu !== null) && (direction === data.direction) && (routeCode === data.routeCode)
        )
      })
      .map((data, index) => {
        return (
          <div key={index} className="food-container">
            {/* 항목 번호, 휴게소 이름 */}
            <div className="area-name">
              {index + 1}. {data.serviceAreaName}<br />
            </div>
            {/* 메뉴명과 가격 */}
            <div className="food-name">
              {data.batchMenu} ( {data.salePrice} )
            </div>
          </div>
        )
      })

  return (
    <div className="main-container">
      {/* 상단 방향 표시 부분 */}
      <div className="direction"> 
        {data[0].routeName}({direction}방면) 휴게소 대표메뉴
      </div>
      {/* 슬라이드 구현 부분 */}
      <StyledSlider {...settings}>
        {foodUI}
      </StyledSlider>
    </div>
  )
}

export { RepFood }