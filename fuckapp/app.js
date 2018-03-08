const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cons = require('consolidate');
const config = require('./config/config');
const passport = require('passport');
const methodOverride = require('method-override');
const server = require('./server');
const routes = require('./routes');
const basicAuth = require('./middleware/basicAuth');

require('./middleware/passport');

const app = express();
const port = process.env.PORT || 8080;

// servidor, socket.io y mongo
var mainServer = require('http').createServer(app),
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

// Initialize Basic Http Authorization
basicAuth(app);

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


module.exports = app;