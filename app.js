var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
var cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./app/dashboard/router');
const adminRouter = require('./app/admins/router');
// const usersRouter = require('./app/users/router');
const eventRouter = require('./app/event/router');
const categoryRouter = require('./app/category/router');
const talentRouter = require('./app/talent/router');
const requestRouter = require('./app/request/router');
const apiRouter = require('./app/api/router');

var app = express();
const URL = '/v1/api';
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use(flash());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte')));

app.use('/', adminRouter);
app.use('/dashboard', indexRouter);
// app.use('/users', usersRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);
app.use('/talent', talentRouter);
app.use('/request', requestRouter);

// API
app.use(`${URL}/leisure`, apiRouter);

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

module.exports = app;
