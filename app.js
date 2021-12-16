var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var notilistRouter = require('./routes/noti-list');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var adminCreateRouter = require('./routes/admin-create');
var timelineRouter = require('./routes/timeline');
var notiPageRouter = require('./routes/noti-page');
var changeInfoRouter = require('./routes/student-change-info');
var ListPBRouter = require('./routes/list-PB');
var notiPostRouter = require('./routes/noti-post');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/admin-create', adminCreateRouter);
app.use('/timeline', timelineRouter);
app.use('/noti-page', notiPageRouter);
app.use('/change-info', changeInfoRouter);
app.use('/list-PB', ListPBRouter);
app.use('/noti-list', notilistRouter);
app.use('/noti-post', notiPostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

module.exports = app;