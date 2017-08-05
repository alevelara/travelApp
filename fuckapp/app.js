var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');
var methodOverride = require('method-override');
var mongo_server = require('./server')

// servidor, socket.io y mongo
var server = require('http').createServer(app);
var io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//var routes = require('./routes');
//routes(app);

var index = require('./routes/index')
index(app)
var routes = require('./routes/users')
routes(app);
var login = require('./routes/login')
login(app);


app.use(express.static(path.join(__dirname, 'public/javascripts/')));

app.use(function(req,res){ 
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

mongo_server.mongo_connection

module.exports = app;
