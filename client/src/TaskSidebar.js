import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col,ListGroup} from 'react-bootstrap';
import {filters} from './App'
import {NavLink} from 'react-router-dom';


function TaskSidebar(props){
    return (
        <Col md={3} >
          <ListGroup>
            {filters.map((f)=>{
              return (<TaskSelector key={f} setFilter={props.taskSetFilter} activeFilter={props.taskFilter} name={f}></TaskSelector>);
            })}
          </ListGroup>
        </Col>
    )
}

function TaskSelector(props){
  /*if(props.activeFilter === props.name){
    return (
      <ListGroup.Item active>{props.name}</ListGroup.Item>
    )
  }
  return (
      <ListGroup.Item onClick={()=>{props.setFilter(props.name)}}>{props.name}</ListGroup.Item>    
  )*/
  const name= props.name==='All'?'/':'/'+props.name;
  return (
    <NavLink to={name} className='list-group-item' activeClassName='active' exact>
      {props.name}
    </NavLink>
  )
}

export {TaskSidebar}