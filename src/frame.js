/*eslint-disable*/
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import './CSS/App.css';

function Navibar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img className="App-logo"
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{''}

          리액트
        </Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">코로나 현황보기</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </Container>
    </Navbar>
  )
}

function DaeMoon() {
  return (
    <div className='daeMoon'>
      <Container>
        <h1> All great ideas come from walking. </h1>
        <p>
          F. Nietzsche
        </p>
      </Container>
    </div>

  )
}

function Footer() {
  return (

    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          </a>
          <span className="text-muted">© 2021 Company, Inc</span>
        </div>
      </footer>
    </div>
  )
}

export { Navibar, DaeMoon, Footer }