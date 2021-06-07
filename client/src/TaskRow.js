import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import{Col,Row, Form}from'react-bootstrap';
import {useState} from 'react';
import {ModalTask} from './TaskModal';

function TaskRow(props){
    return (
        <Row className={props.task.tmp?"background-grey":""}>
          <Col md={1}>
            <Form.Check checked={props.task.completed?true:false} onChange={()=>{props.setCompleted(props.task.id)}}></Form.Check>
          </Col>
          <TaskData desc={props.task.description} private={props.task.private} deadline={props.task.deadline} important={props.task.important}></TaskData>
          
          <TaskButton deleteTask={props.deleteTask} task={props.task} editTask={props.editTask}></TaskButton>
        </Row>
    )
}

function TaskData(props){
  return (
    <>
    <Col md={5} >
    <div style={{ color:  props.important ? '#dc3545': ''}}>{props.desc}</div>
          </Col>
          <Col md={1}>
            {props.private||
            (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-person-square mr-3" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
            </svg>)
            }
          </Col>
          <Col md={3}>
            {props.deadline?props.deadline.format("YYYY-MM-DD HH:mm"):''}
          </Col>
    </>
  )
}

function TaskButton(props){
  const [showModal, setShowModal] = useState(false);

  return (
    <Col md={2}>
      <span onClick={()=>setShowModal(true)} >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-fill mx-2" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg>
      </span>
      {showModal && (<ModalTask show={true} onHide={setShowModal} addTask={props.editTask} task={props.task}/>)}
      <span onClick={() => props.deleteTask(props.task.id)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>
      </span>
    </Col>
  )
}
export {TaskRow}