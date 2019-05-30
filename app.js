var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();

//middleware
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', isAuthenticated, booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Connect mongoDb
mongoose.connect('mongodb+srv://moodcafe-user:moodcafe-pwd@studentcluster-k7i07.mongodb.net/moodcafe?retryWrites=true');

// Helper function.. 
function isAuthenticated(req, res, next) {
  jwt.verify(req.headers['x-access-token'], 'secretKey', function (err, decoded) {
    if (err) {
      res.status(401).end();
    } else {
      // add user id to request, if you need access
      req.body.userId = decoded.id;
      next();
    }
  });
}

module.exports = app;