import React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';
import {updateTask, deleteTask} from '../services/api-service';
import { udpdateTaskToStore, removeTaskToStore } from '../redux/actions';
import { connect } from 'react-redux'

class TaskComponent extends React.Component {
    
    handclickUpdateTask(e){
        var updated_status="";
        console.log(this.props.status);
        switch(this.props.status){
            case "pending":
                updated_status= "ongoing";
                break;
            default:
                updated_status= "completed";
                break;
        }
        const refresh = this.props.refresh;
        const updateStore = this.props.udpdateTaskToStore;
        var self= this;
        updateTask(this.props.id, {status:  updated_status}).then(data=>{
           console.log(data); 
           if(!data.error){
                updateStore(self.props.id, self.props.status);
                refresh();
            }
        });
    }
    
    handclickDeleteTask(e){
        const refresh = this.props.refresh;
        const deleteTaskStore = this.props.removeTaskToStore;
        var self= this;
        deleteTask(this.props.id).then(data=>{
           console.log(data); 
           if(!data.error){
                deleteTaskStore(self.props.id, self.props.status);
                refresh();
            }
        });
    }
    
    render() {
        const buttons_update = this.props.status!=="completed" ?
                                <Button bsStyle="info"
                                    onClick={this.handclickUpdateTask.bind(this)}>
                                    <Glyphicon glyph="chevron-right" />
                                </Button> : "";                        
       
        return  <div className={"task task-"+this.props.status}>
                    <span>{this.props.name}</span>
                    {buttons_update}
                    <Button bsStyle={this.props.status!=="completed" ? "info" : "success"}
                            onClick={this.handclickDeleteTask.bind(this)}>
                            <Glyphicon glyph="trash" />
                    </Button>
                </div>;
    }
};

export default connect(null, {udpdateTaskToStore, removeTaskToStore})(TaskComponent);