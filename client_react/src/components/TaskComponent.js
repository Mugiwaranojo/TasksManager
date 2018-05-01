import React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';
import {updateTask, deleteTask} from '../services/api-service';

class TaskComponent extends React.Component {
    
    handclickUpdateTask(e){
        var updated_status="";
        console.log(this.props.status);
        switch(this.props.status[0]){
            case "pending":
                updated_status= "ongoing";
                break;
            default:
                updated_status= "completed";
                break;
        }
        updateTask(this.props.id, {status:  updated_status}).then(data=>{
           console.log(data); 
           if(!data.error){
                window.location.reload()
            }
        });
    }
    
    handclickDeleteTask(e){
        deleteTask(this.props.id).then(data=>{
           console.log(data); 
           if(!data.error){
                window.location.reload()
            }
        });
    }
    
    render() {
        const buttons_update = this.props.status[0]!=="completed" ?
                                <Button bsStyle="info"
                                    onClick={this.handclickUpdateTask.bind(this)}>
                                    <Glyphicon glyph="chevron-right" />
                                </Button> : "";                        
       
        return  <div className={"task task-"+this.props.status}>
                    <span>{this.props.name}</span>
                    {buttons_update}
                    <Button bsStyle={this.props.status[0]!=="completed" ? "info" : "success"}
                            onClick={this.handclickDeleteTask.bind(this)}>
                            <Glyphicon glyph="trash" />
                    </Button>
                </div>;
    }
};

export default TaskComponent;