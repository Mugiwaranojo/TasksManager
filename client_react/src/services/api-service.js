import axios from 'axios';
import openSocket from 'socket.io-client';

var  socket = null;
const BASE_URL = 'http://localhost:3300';

export {initSocket, subscribeToEvent, getTasks, getTask, createTask, updateTask, deleteTask};

function initSocket(token){
    console.log("initSocket");
    socket = openSocket(BASE_URL, {query: 'token='+token });
}

function subscribeToEvent(name, callback) {
    console.log(socket);
    if(socket!==null){
        socket.on(name, callback);
    }
}

function getTasks() {
  const url = `${BASE_URL}/tasks`;
  return axios.get(url, { headers: { Authorization: `${getAccessToken()}` }}).then((response) => response.data);
}

function getTask(taskId) {
  const url = `${BASE_URL}/tasks/`+taskId;
  return axios.get(url, { headers: { Authorization: `${getAccessToken()}` }}).then((response) => response.data);
}

function createTask(dataTask){
    const url = `${BASE_URL}/tasks`;
    return axios.post(url, dataTask, { headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
 }
 
 function updateTask(taskId, dataTask){
    const url = `${BASE_URL}/tasks/`+taskId;
    return axios.put(url, dataTask, { headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
 }
 
 function deleteTask(taskId){
    const url = `${BASE_URL}/tasks/`+taskId;
    return axios.delete(url, { headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
 } 
 
function getAccessToken() {
  return localStorage.getItem("ID_TOKEN");
}
 