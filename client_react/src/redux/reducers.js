/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {orderTasksByStatus} from '../models/TasksHelper';

const initialState = {
    tasks_pending: [],
    tasks_ongoing: [],
    tasks_completed:[]
};

export default function reducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    
    const newState = Object.assign({}, state);
    switch (action.type) {
        case "GET_TASKS":
            var data = orderTasksByStatus(action.tasks);
            newState.tasks_pending  =  data["pending"] ? data["pending"]  : [];
            newState.tasks_ongoing  =  data["ongoing"] ? data["ongoing"]  : [];
            newState.tasks_completed=  data["completed"] ? data["completed"]  : [];
           break;
        case "ADD_TASK":
            console.log(" add task ");
            newState.tasks_pending.push(action.task);
            break;
        case "UPDATE_TASK":
            
            break;
        case "REMOVE_TASK":
            
            break;
        default:
            return state;
    }
    return newState;
}

