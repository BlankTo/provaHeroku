
import { useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('') ;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };
        
        // SOME VALIDATION, ADD MORE!!!
        let valid = true;
        if(!username.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/g) || password === '' )
            valid = false;
        
        if(valid)
        {
          props.login(credentials);
        }
        else {
          // show a better error message...
          setErrorMessage('Invalid email or password.')
        }
    };
  
    return (
      <>
      <h1 className="text-center">Login</h1>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
      <Form>
        <Form.Group controlId='username' >
            <Form.Label>Email</Form.Label>
            <Form.Control  type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control  type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        </Form.Group>
        {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
        <Button className="text-center px-3 w-100" variant="info" onClick={handleSubmit}>Login</Button>
      </Form>
      </Col>
      </Row>
      </>)
  }

function LogoutButton(props) {
    return(
      <Col>
        <Button variant="outline-info" className="myButton" onClick={props.logout}>Logout</Button>
      </Col>
    )
  }
  
  export { LoginForm, LogoutButton };