var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var mongo_server = require('./server')

// servidor, socket.io y mongo
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var routes = require('./routes/users')
routes(app);

app.use(function(req,res){ 
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

mongo_server.mongo_connection

module.exports = app;
