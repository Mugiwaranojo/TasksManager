import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import CreateTaskComponent from './components/CreateTaskComponent';
import TasksListComponent from './components/TasksListCompenent';
import {getTasks} from './services/api-service';
import {orderTasksByStatus} from './models/TasksHelper';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			tasks_pending: [],
                        tasks_ongoing: [],
                        tasks_completed:[]
		}
	}
	
	componentDidMount(){
            this.refreshDatas();
	}
        
        refreshDatas(){
            getTasks().then(data => {
                        data= orderTasksByStatus(data);
                        console.log(data);		
                        this.setState({
                            tasks_pending: data["pending"] ? data["pending"]  : [],
                            tasks_ongoing: data["ongoing"] ? data["ongoing"]  : [],
                            tasks_completed:data["completed"] ? data["completed"]  : []
                        })
                });
        }
	
	render() {
		return (
		<div className="App">
                    <header className="App-header">
                        <Grid>
                            <Row>
                                <Col xs={4} md={2}>
                                    <img src="/task-icon.png" className="App-logo" alt="logo" />
                                </Col>
                                <Col xs={8} md={10}>
                                    <h1 className="App-title">My tasks</h1>
                                </Col>
                            </Row>
                        </Grid>
                    </header>
                    <div className="App-content">
                        <CreateTaskComponent refresh={this.refreshDatas.bind(this)}/>
                        <div className="App-tasks">
                            <Grid>
                                <Row>
                                   <TasksListComponent tasks={this.state.tasks_pending} type="pending" refresh={this.refreshDatas.bind(this)}/>
                                   <TasksListComponent tasks={this.state.tasks_ongoing} type="ongoing" refresh={this.refreshDatas.bind(this)}/>
                                   <TasksListComponent tasks={this.state.tasks_completed} type="completed" refresh={this.refreshDatas.bind(this)}/>
                                </Row>
                            </Grid>
                        </div>
                    </div>
		</div>
    );
  }
}

export default App;
