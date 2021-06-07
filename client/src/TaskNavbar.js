import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import{Nav,Navbar,Form, FormControl, Button}from'react-bootstrap';
import {LogoutButton } from './loginComponents';

function TaskNavbar(props){
    return (
        <Navbar bg="info" expand="lg">
          <Navbar.Brand href="#home">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-check2-all inline" viewBox="0 0 16 16">
              <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
              <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
            </svg>  
            <div className="d-inline-block">
              <p className="inline text-white">
                ToDo manager
              </p>
            </div>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info" className="myButton">Search</Button>
            </Form>
          </Navbar.Collapse>
          <Nav.Item className='text-white text-right'>
            {props.message}
          </Nav.Item>
          <Nav.Item>
            <LogoutButton logout={props.doLogOut}/>
          </Nav.Item>
          <Nav.Item>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-person-square mr-3" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>
          </Nav.Item>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        </Navbar>
    )
}

export {TaskNavbar}