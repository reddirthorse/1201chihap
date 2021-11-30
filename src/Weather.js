import React from 'react';
import './CSS/Weather.css'

function Weather(props) {
  return (

    <div className="col-md-12">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-success"><h3> {props.weather.unitName} </h3></strong>
          <h3 className="mb-1">{props.weather.routeName}</h3>
          <div className="mb-1 text-muted">주소 : {props.weather.addr}</div>
          <p className="mb-auto">노선번호 : {props.weather.routeNo}</p>
          <p className="mb-auto">측정시간 : {props.weather.stdHour} 시</p>
        </div>

        <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm">

          <div className='card mx-auto'>
            <div className="card-img-overlay">
              <h5>{props.weather.weatherContents}</h5>
              <div className="rainy"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export { Weather }