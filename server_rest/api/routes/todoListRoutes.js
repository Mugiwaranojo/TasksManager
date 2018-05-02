'use strict';
var authService = require("../../services/AuthService");

module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(authService.authCheck, todoList.list_all_tasks)
    .post(authService.authCheck, todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(authService.authCheck, todoList.read_a_task)
    .put(authService.authCheck, todoList.update_a_task)
    .delete(authService.authCheck, todoList.delete_a_task);
};
