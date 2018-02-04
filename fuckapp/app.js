var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  bodyParser = require('body-parser');

//Modules
var path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    cons = require('consolidate'),
    config = require('./config/config'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    server = require('./server'),
    routes = require('./routes');
 require('./config/passport');

// servidor, socket.io y mongo
var server = require('http').createServer(app),
    io = require('socket.io')(server);

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

//Initialize passport.
passport.initialize();

//Initialize routes
routes(app);

if(config.get('env') !== 'test') {
    //use morgan to log at command line
    app.use(logger('combined')); //'combined' outputs the Apache style LOGs
}

app.use(express.static(path.join(__dirname, 'public/javascripts/')));

app.use(function(req,res){ 
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

server.Sequelize

module.exports = app;