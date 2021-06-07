import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import { TaskSidebar } from './TaskSidebar';
import { useState } from 'react';
import { TaskRowContainer } from './TaskRowContainer';
import {BrowserRouter as Router} from 'react-router-dom'; 



function TaskPage(props){
    const [filter, setFilter] = useState('All');
    
    return (
        <Router>
        <Row>
            <TaskSidebar taskSetFilter={setFilter} taskFilter={filter}></TaskSidebar>
            
            <TaskRowContainer taskFilter={filter} tasks={props.tasks}></TaskRowContainer>
            
        </Row>
        </Router>
    )
}

export {TaskPage}