/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * action types
 */
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

/*
 * action creators
 */

/*
 * action creators
 */
export function getTasksToStore(tasks) {
    return { type: GET_TASKS,  tasks};
}

export function addTasksToStore(task) {
    return { type: ADD_TASK, task };
}

export function udpdateTaskToStore(taskId, status) {
    return { type: UPDATE_TASK, taskId, status};
}

export function removeTaskToStore(taskId, status) {
    return { type: REMOVE_TASK, taskId, status};
}
