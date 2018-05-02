import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import Login from './components/Login';
import CreateTaskComponent from './components/CreateTaskComponent';
import TasksListComponent from './components/TasksListCompenent';
import {getTasks} from './services/api-service';
import {orderTasksByStatus} from './models/TasksHelper';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
                        googleUserInfo: JSON.parse(localStorage.getItem('USER_INFO')),
                        access_token: null,
			tasks_pending: [],
                        tasks_ongoing: [],
                        tasks_completed:[]
		};
	}
        
        updateLoginInfo(user, token){
            localStorage.setItem("ACCESS_TOKEN_KEY", token);
            localStorage.setItem("USER_INFO", JSON.stringify(user));
            this.setState({googleUserInfo: user, access_token: token});
            this.refreshDatas();
        }
	
	componentDidMount(){
            if(localStorage.getItem("ACCESS_TOKEN_KEY")!==null){
                this.refreshDatas();
            }
	}
        
        refreshDatas(){
            var self= this;
            getTasks().then(data => {
                        data= orderTasksByStatus(data);
                        console.log(data);		
                        this.setState({
                            tasks_pending: data["pending"] ? data["pending"]  : [],
                            tasks_ongoing: data["ongoing"] ? data["ongoing"]  : [],
                            tasks_completed:data["completed"] ? data["completed"]  : []
                        });
                }).catch(function(error){
                    this.logout();
                });
        }
        
        logout(e){
            localStorage.removeItem("ACCESS_TOKEN_KEY");
            localStorage.removeItem("USER_INFO");
            this.setState({googleUserInfo: null, access_token: null});
        }
	
	render() {
                const main_content= localStorage.getItem("ACCESS_TOKEN_KEY")===null ? <Login updateInfo={this.updateLoginInfo.bind(this)}/> : 
                        <div>
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
                        </div>;
                const userInfo= this.state.googleUserInfo !== null ?
                    <div className="userInfo">
                        <img src={this.state.googleUserInfo.Paa} alt="avatar"/>
                        <span>{this.state.googleUserInfo.ig}</span>
                        <a href="#" onClick={this.logout.bind(this)} >déconnection</a>
                    </div> : "";
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
                        { userInfo }
                    </header>
                    <div className="App-content">
                        { main_content }
                    </div>
		</div>
    );
  }
}

export default App;
