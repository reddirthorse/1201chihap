/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './CSS/UserInput.css';

function UserInput(props) {
  let 광역시 = ['서울', '대전', '대구', '부산', '광주']
  let 글자색 = ['info', 'info', 'info', 'info', 'info']
  let [idx, setIdx] = useState(2)
  let [idxEnd, setIdxEnd] = useState(0)
  
  const selectStart = props.start; // 초기값 서울
  const selectEnd = props.end;     // 초기값 부산

  
// 출발지가 선택될때마다 도착지의 드롭다운 메뉴가 갱신
useEffect( () => {
  dropdownMenuUpdate()
}, [selectStart])


// 도착지 드롭다운 메뉴 갱신 함수
function dropdownMenuUpdate() {
  const obj = (
    광역시.map( (글, i) => {
                
      if ( selectEnd === 글 || selectStart === 글 ) {
        console.log(selectStart, selectEnd)
        return ;
      } else {
        return (
          <Dropdown.Item key={i}
            as="button"
            onClick={() => {
              props.setEnd(글);
              setIdxEnd(i)
            }}>
            {글} </Dropdown.Item>
        )
      }
    })
  )
  return obj;
  
}

  

  return (

    <div className="col-md-12" >
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >

        <div className="col-md-12 p-1 d-none d-md-block border rounded overflow-hidden shadow-sm" >
        </div>

        <div className="col-md-4 d-none d-md-block border rounded overflow-hidden shadow-sm" >
          <div className='card col-md-12' >
            {/* <img src={require("./image/" + (props.start) + "배경.jpg").default} style={{ height: '200px', opacity: 0.9 }}/> */}
            <div className="card-img-overlay" >
              <DropdownButton id="dropdown-item-button"
                title="출발지 선택"
                size="sm"
                variant="secondary" >
                {광역시.map( (글, i) => { // 배열 수 만큼 반복하되, 출발지로 선택된 도시는 제외

                  if( selectStart === 글 ) {
                    return ;
                  } else {
                    return (
                      <Dropdown.Item key={i}
                        as="button"
                        onClick={() => {
                          props.setStart(글);
                          setIdx(i)
                        }}>
                        {글}
                      </Dropdown.Item>
                    )
                  }
                })
                } </DropdownButton>
              <hr />

              <strong className={"d-inline-block mb-2 text-" + (글자색[idx])} > <h1> <b> {props.start} </b>
              </h1>
              </strong>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-none d-md-block border rounded overflow-hidden shadow-sm" >
          <div className='card col-md-12'>
            {/* <img src={require("./image/" + (props.도착지) + "배경.jpg").default} style={{ height: '200px', opacity: 0.9 }} /> */}
            <div className="card-img-overlay" >
              <DropdownButton id="dropdown-item-button"
                title="도착지 선택"
                size="sm"
                variant="secondary" >
                  {dropdownMenuUpdate()} {/* 선택돼있는 도착지와 출발지로 선택된 도시 드롭다운메뉴에서 제거 */}
              </DropdownButton>
              <hr />
              <strong className={"d-inline-block mb-2 text-" + (글자색[idxEnd])} > <h1> <b> {props.end} </b>
              </h1> </strong>
            </div>
          </div>
        </div>

        <div id="fabio"
          className="col p-4 d-none d-md-block border rounded overflow-hidden shadow-sm" >
          <div className='card mx-auto' > { /* <img src={require("./image/대구배경.jpg").default} class="back-img" alt=""/> */}

            <div className="wrap" >
              <button className="selButton"
                onClick={() => { props.setIsLoading(true) }}> Submit </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { UserInput }