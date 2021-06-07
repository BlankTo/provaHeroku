import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import{ Modal, Button, Form}from'react-bootstrap';
import dayjs from 'dayjs';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

function MyButton(props){
  return (
    <Button variant="primary" className="fixed-right-bottom bg-info text-white" onClick={()=> {props.setModalShow(true);}}> + </Button>
  );
}


function ModalTask(props) {
  const location = useLocation();

  const [description, setDescription] = useState(props.task?props.task.description:'');
  const [private1, setPrivate] = useState(props.task?props.task.private:(location.pathname.match('/Private')?true:false));
  const [important, setImportant] = useState(props.task?props.task.important:(location.pathname.match('/Important')?true:false));
  const [deadline, setDeadline] = useState(props.task?props.task.deadline.format('YYYY-MM-DDTHH:mm'):location.pathname.match('/Today')?dayjs().format("YYYY-MM-DDTHH:mm"):'');  //dayjs().format('DD/MM/YYYY hh:mm')

  const [errorD, setErrorD] = useState(false);  
  const [errorDate, setErrorDate] = useState(false);  

  const check = (task) => {
    let flag = true;
    if(task.description===''){
      setErrorD(true);
      flag = false;
    } else setErrorD(false);
    if(!task.deadline.isValid()|| task.deadline.isBefore(dayjs().startOf('day'))){
      setErrorDate(true);
      flag = false;
    } else {
      setErrorDate(false);
      if(task.deadline.isSame(dayjs().startOf('day')))
        task.deadline = dayjs().endOf('day');
    }
    
    return flag;
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const task = {id:props.task?props.task.id:-1, description: description, private: private1?true:false, important: important?true:false, deadline: dayjs(deadline), completed:(props.task?props.task.completed:false)};
      if(check(task)){
        props.addTask(task);
        props.onHide(false);
      } else {

      }
  };

  return (
      <>
        <Modal show={props.show}>
          <Modal.Header>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group>
                  <Form.Label>Description</Form.Label> 
                  <Form.Control type="text" value={description} onChange={(e) => {e.preventDefault();setDescription(e.target.value)}} onKeyPress={(e)=>{
                    if(e.key ==='Enter')
                      e.preventDefault();
                  }} required >
                  </Form.Control>
                    {errorD ? <p className="text-danger">Error description is required. </p> : null}
              </Form.Group>
              <Form.Group>
                  <Form.Check type="checkbox" label="Private" checked={private1} onChange={(e) => setPrivate(e.target.checked)}/>
              </Form.Group>
              <Form.Group>
                  <Form.Check type="checkbox" label="Important" checked={important} onChange={(e) => setImportant(e.target.checked)}/>
              </Form.Group>
              <Form.Group>
                  <Form.Check type="datetime-local" label="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
              </Form.Group>
                  {errorDate ? <p className="text-danger">Error: Date is wrong. </p> : null}
            </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {props.onHide(false)}}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => {handleSubmit(e)}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  export{ModalTask, MyButton};