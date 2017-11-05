var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  bodyParser = require('body-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');
var config = require('config');
var passport = require('passport');
var methodOverride = require('method-override');
var mongo_server = require('./server')
var routes = require('./routes');
 require('./config/passport');


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



passport.initialize();
routes(app);

if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(logger('combined')); //'combined' outputs the Apache style LOGs
}

app.use(express.static(path.join(__dirname, 'public/javascripts/')));

app.use(function(req,res){ 
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

mongo_server.mongo_connection

module.exports = app;