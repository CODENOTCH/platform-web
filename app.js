let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

let index=require('./routes/index')
let users = require('./routes/users')
let students=require('./routes/students')
let content= require('./routes/content')
let docs= require('./routes/docs')
let slides=require('./routes/slides')
let teacher=require('./routes/teachers')
let develop=require('./routes/developments')
let contentIndex=require('./routes/contentIndex')
let bootcamp=require('./routes/bootcamps')

let app = express();

let mongoose = require('mongoose');
mongoose.connect('mongodb://rafa:codenotch35@ds151908.mlab.com:51908/heroku_xddm62kq');
let db=mongoose.connection;
db.once('open', function() {
  console.log('connected')
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret: "Codenotch57"}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);
app.use('/users', users);
app.use('/content',content);
app.use('/contentIndex',contentIndex)
app.use('/students',students);
app.use('/docs',docs);
app.use('/slides',slides);
app.use('/teachers',teacher);
app.use('/developments',develop);
app.use('/bootcamps',bootcamp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
