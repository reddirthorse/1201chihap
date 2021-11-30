/*eslint-disable*/
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './CSS/UserInput.css';

function UserInput(props) {
  let 광역시 = ['서울', '대전', '대구', '부산', '광주']
  let 글자색 = ['warning', 'warning', 'warning', 'warning', 'warning']
  let [idx, setIdx] = useState(2)
  let [idxEnd, setIdxEnd] = useState(0)

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
                {광역시.map(function (글, i) { // 요소수 만큼 반복
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
                {광역시.map(function (글, i) { // 요소수 만큼 반복
                  return (
                    <Dropdown.Item key={i}
                      as="button"
                      onClick={() => {
                        props.setEnd(글);
                        setIdxEnd(i)
                      }}>
                      {글} </Dropdown.Item>
                  )
                })
                }
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