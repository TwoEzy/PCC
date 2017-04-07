var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const exec = require('child_process').exec;

//session
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');


var app = express();

//app.engine('html', require('hogan-express'));
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// view engine setup
var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.get('/:page', (req, res) => {
  //var page = req.params.page
  res.sendFile(path.join(__dirname, '/public/' + req.params.page + '.html'))
})

//session
var sess_options = {
  retries : 1,
  path: "./tmp/sessions/",
  useAsync: true,
  reapInterval: 5000,
  maxAge: 10000
};
app.use(session({
  store: new FileStore(sess_options),
  secret: '2015tajnikljuc',
  resave: true,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//mongodb server activation

exec('mongod --dbpath=./db', function(err, stdout, stderr){
  console.log(err);
  console.log(stderr);
});

//this passes express() to bin/www && socketio/socket.js
module.exports = app;