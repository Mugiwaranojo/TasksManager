require('localenv');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3300,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  server = require('http').createServer(app);
  
var jwt = require('jsonwebtoken');
var io = require('socket.io')(server);
var todoListController = require("./api/controllers/todoListController");

var cors = require('cors');
app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

io.use((socket, next) => {
  if (jwt.decode(socket.handshake.query.token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

todoListController.setSockets(io.sockets);
	
server.listen(port);
console.log('todo list RESTful API server started on: ' + port);