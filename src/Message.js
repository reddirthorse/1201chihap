import { useState } from "react";
import { Carousel, Button } from "react-bootstrap";

function Message(props) {

    return (
        <div className="col-md-12">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">

                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="w-90"
                                src="img/event.png"
                                alt="First slide"
                                style={{opacity: '0.5'}}
                            />
                            <Carousel.Caption>
                                <div className="mb-1 text-muted">{props.message.smsText}</div>
                                <br/>
                                <p className="mb-auto">구분 : {props.message.accType}</p>
                                <p className="mb-auto">발생일자 : {props.message.accDate}</p>
                                <br/>
                                <br/>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="w-90"
                                src="img/weather.png"
                                alt="Third slide"
                                style={{opacity: '0.5'}}
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="w-90"
                            src="img/warning.png"
                            alt="Third slide"
                            style={{opacity: '0.3'}}
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm">
                    <div className='card'>
                        <br/>
                        {props.message.map((m, index) => {
                            return (
                                <div key={index}>
                                    <p style={{fontSize: '0.8rem'}}>{m.smsText}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <Button onClick={props.prevPage} variant="secondary" size="sm" className="m-2">Prev</Button>
                        <Button onClick={props.nextPage} variant="secondary" size="sm" className="m-2">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function UI(props) {
//     return (
//         <div className="col-md-12">
//                                 {props.갱신 === true ? <div>오류</div> : 
//             <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
//                 <div className="col p-4 d-flex flex-column position-static">

//                     <Carousel>
//                         <Carousel.Item>
//                             <img
//                                 className="w-90"
//                                 src="img/event.png"
//                                 alt="First slide"
//                                 style={{opacity: '0.5'}}
//                             />
//                             <Carousel.Caption>
//                                 <div className="mb-1 text-muted">{props.message.smsText}</div>
//                                 <br/>
//                                 <p className="mb-auto">구분 : {props.message.accType}</p>
//                                 <p className="mb-auto">발생일자 : {props.message.accDate}</p>
//                                 <br/>
//                                 <br/>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <img
//                                 className="w-90"
//                                 src="img/weather.png"
//                                 alt="Third slide"
//                                 style={{opacity: '0.5'}}
//                             />

//                             <Carousel.Caption>
//                                 <h3>Third slide label</h3>
//                                 <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <img
//                             className="w-90"
//                             src="img/warning.png"
//                             alt="Third slide"
//                             style={{opacity: '0.3'}}
//                             />

//                             <Carousel.Caption>
//                             <h3>Third slide label</h3>
//                             <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                     </Carousel>
//                 </div>
//                 <div className="col-md-4 p-3 d-none d-md-block border rounded overflow-hidden shadow-sm">
//                     <div className='card'>
//                         <br/>
//                         {props.message.map((m, index) => {
//                             return (
//                                 <>
//                                     <p key={index} style={{fontSize: '0.8rem'}}>{m.smsText}</p>
//                                 </>
//                             )
//                         })}
//                     </div>
//                     <div>
//                         <Button variant="secondary" size="sm" className="m-2">Prev</Button>
//                         <Button variant="secondary" size="sm" className="m-2">Next</Button>
//                     </div>
//                 </div>
//             </div>
// }
//         </div>
//     )
// }

export { Message }