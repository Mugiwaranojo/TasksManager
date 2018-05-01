/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';


import TaskComponent from './TaskComponent';
import { Col } from 'react-bootstrap';

class TasksListComponent extends React.Component {
    
    render(){
        return  <Col xs={12} md={this.props.type==="completed" ? 12 : 6} lg={4}>    
                {this.props.tasks.map((task, index) => (
                    <TaskComponent key={"task-"+task._id} id={task._id} name={task.name} status={task.status}/>
                ))}
                </Col>;
        
    }
}


export default TasksListComponent;