import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import Login from './components/Login';
import CreateTaskComponent from './components/CreateTaskComponent';
import TasksListComponent from './components/TasksListCompenent';
import {getTasks} from './services/api-service';
import { getTasksToStore } from './redux/actions';
import { connect } from 'react-redux';


class App extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
                        googleUserInfo: JSON.parse(localStorage.getItem('USER_INFO'))
		};
	}
        
        updateLoginInfo(user, token){
            localStorage.setItem("ACCESS_TOKEN_KEY", token);
            localStorage.setItem("USER_INFO", JSON.stringify(user));
            this.setState({googleUserInfo: user});
            this.refreshDatas();
        }
	
	componentDidMount(){
            if(this.isLogin()){
                this.refreshDatas();
            }
	}
        
        refreshDatas(){
            var self=this;
            getTasks().then(data => {
                        this.props.getTasksToStore(data);
                }).catch(function(error){
                    self.logout();
                });
        }
        
        isLogin(){
            return localStorage.getItem("ACCESS_TOKEN_KEY")!==null && this.state.googleUserInfo!==null;
        }
        
        logout(){
            localStorage.removeItem("ACCESS_TOKEN_KEY");
            localStorage.removeItem("USER_INFO");
            this.setState({googleUserInfo: null, access_token: null});
        }
	
	render() {
                const main_content= !this.isLogin() ? <Login updateInfo={this.updateLoginInfo.bind(this)}/> :
                        <div>
                            <div className="userInfo">
                                <img src={this.state.googleUserInfo.Paa} alt="avatar"/>
                                <span>{this.state.googleUserInfo.ig}</span>
                                <a onClick={this.logout.bind(this)} >déconnection</a>
                            </div>
                            <CreateTaskComponent refresh={this.refreshDatas.bind(this)}/>
                            <div className="App-tasks">
                                <Grid>
                                    <Row>
                                       <TasksListComponent tasks={this.props.tasks_pending} type="pending" refresh={this.refreshDatas.bind(this)}/>
                                       <TasksListComponent tasks={this.props.tasks_ongoing} type="ongoing" refresh={this.refreshDatas.bind(this)}/>
                                       <TasksListComponent tasks={this.props.tasks_completed} type="completed" refresh={this.refreshDatas.bind(this)}/>
                                    </Row>
                                </Grid>
                            </div>
                        </div>;
                    
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
                        { main_content }
                    </div>
		</div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks_pending: state.tasks_pending,
           tasks_ongoing: state.tasks_ongoing,
           tasks_completed:state.tasks_completed };
}

const mapDispatchToProps = {
 getTasksToStore
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
