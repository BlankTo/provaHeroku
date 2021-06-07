import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import{Col, Container}from'react-bootstrap';
import { TaskRow } from './TaskRow';
import {useEffect, useState} from 'react'
import dayjs from 'dayjs';
import { ModalTask, MyButton } from './TaskModal';
import {Route} from 'react-router-dom';
import {getAllTasks, addTaskDb, deleteTaskDb, updateTaskDb, mark} from './API';

function TaskRowContainer(props){
    const [modalShow, setModalShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState(false);
    const [dirty, setDirty] = useState(false);
    const filtersDic = {'All' : (t) =>  true, 'Today' : (t) => t.deadline && dayjs().format('YYYY/MM/DD') === t.deadline.format('YYYY/MM/DD'), 'Next 7 days' : (t) => t.deadline && t.deadline.isAfter(dayjs()) && t.deadline.isBefore(dayjs().add('7', 'day')) , 'Private' : (t) => t.private, 'Important' : (t) => t.important};
    
    async function getTasks(){
        const data = await getAllTasks(filter);
        setTasks(data);
    }
    useEffect(()=>{ 
        if(dirty){       
            getTasks();
            setDirty(false);
        }
    }, [dirty]);
    useEffect(()=>{    
        if(filter)    
            getTasks();
    }, [filter]);

    const addTask = (t) => {
        async function addTaskHandler(){
            
            t.id = tasks.map((t)=>t.id).reduce((id1, id2)=>id1>id2?id1:id2, 0) + 1;
            setTasks((oldTask) => [...oldTask, {...t, tmp:true}]);
            await addTaskDb(t);
            setDirty(true);
        }
        addTaskHandler();
    };

    const deleteTask = (id) => {
        async function deleteTaskHandler(){
            setTasks((oldTask) => oldTask.filter((e) => e.id !== id ));
            await deleteTaskDb(id);
            setDirty(true);
        }
        deleteTaskHandler();
    };
    const editTask = (task) =>{
        async function editTaskHandler(){
            setTasks((oldTasks) => oldTasks.map((t)=>{
                if(t.id === task.id)
                    return {id:task.id, description:task.description, private:task.private, important:task.important, deadline:dayjs(task.deadline), tmp:true};
                else
                    return t;
            }));
            await updateTaskDb(task);
            setDirty(true);
        }
        editTaskHandler();

    }
    const setCompleted = (id)=>{
        async function setCompletedHandler(){
            setTasks((oldTasks) => oldTasks.map((t)=>{
                if(t.id === id)
                    return {completed: t.completed?false:true, id:t.id, description:t.description, private:t.private, important:t.important, deadline:dayjs(t.deadline)};
                else
                    return t;
            }));
            await mark(id);
            setDirty(true);
        }
        setCompletedHandler();
    }
    return (     
        <>
        <MyButton setModalShow={setModalShow}>
        +
        </MyButton>

        {modalShow && (<ModalTask show={true} onHide={setModalShow} addTask={addTask}/>)}

        <Col md={9}>
            <Route exact path='/' render={({match})=>
                (<>
                <h1>{'All'}</h1>
                <Container>
                    {setFilter('All')}
                {tasks.filter(filtersDic['All']).map((t)=>(<TaskRow key={t.id} task={t} setTask={setTasks} deleteTask={deleteTask} editTask={editTask} setCompleted={setCompleted}></TaskRow>))}
                </Container>
                </>)
            }>
                
            </Route>
            <Route path='/:filter' render={({match})=>
                (<>
                <h1>{match.params.filter}</h1>
                <Container>
                {filtersDic[match.params.filter]?setFilter(match.params.filter):''}
                {filtersDic[match.params.filter]?
                tasks.map((t)=>(<TaskRow key={t.id} task={t} setTask={setTasks} deleteTask={deleteTask} editTask={editTask} setCompleted={setCompleted}></TaskRow>)):
                (<p className='text-danger'>Filter not found!</p>)}
                </Container>
                </>)
            }>
                
            </Route>
        </Col>
        </>
    )
}



export {TaskRowContainer};