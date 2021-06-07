import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import { TaskNavbar } from './TaskNavbar';
import {TaskPage} from './TaskPage';

import { LoginForm} from './loginComponents';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import {  BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import API from './API';


const filters=['All', 'Today', 'Next 7 days', 'Private', 'Important'];


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    async function getUserI(){ 
      try {
        const userInfo = await API.getUserInfo();
        setLoggedIn(userInfo);
        setMessage('Welcome, ' + userInfo.name+ '!');
      }
      catch (e) { setLoggedIn(false); } 
    } 

    getUserI();
  }, []);


  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(user);
      setMessage(`Welcome, ${user}!`);
    } catch(err) {
      setLoggedIn(false);
      setMessage(err);
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setMessage(false);
    // clean up everything
    //setCourses([]);
    //setExams([]);
  }

  return (
    <>
    <Router>  
        <Route path="/" render={() =>
        <>
          
          {loggedIn ?
            <div>
              <TaskNavbar doLogOut={doLogOut} message={message}></TaskNavbar>
              <TaskPage ></TaskPage>
            </div>
          :<> 
          {message ? <Alert show={show} variant="danger">{message}</Alert> : ''}
          <LoginForm login={doLogIn} /> </>}
        </>
        } />

        <Route path="/:filter" render={({match}) => 
          {//if(match.params!=undefined)
          <>{loggedIn ? <Redirect to={"/"+match.params.filter} /> : <Redirect to="/login" />} </>
        
        }}/>

      </Router>
    </>
  );
}

export default App;
export {filters}