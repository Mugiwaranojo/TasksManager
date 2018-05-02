import axios from 'axios';

const BASE_URL = 'http://localhost:3300';

export {getTasks, getTask, createTask, updateTask, deleteTask};

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
  return localStorage.getItem("ACCESS_TOKEN_KEY");
}
 