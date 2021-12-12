var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// <<<<<<< HEAD
// var loginRouter = require('./routes/login');
// var adminCreateRouter = require('./routes/admin-create');
// var timelineRouter = require('./routes/timeline');
// var notiPageRouter = require('./routes/noti-page');
// var changeInfoRouter = require('./routes/student-change-info');
// =======
var postRouter = require('./routes/post');
var authRouter = require('./routes/auth');
var ggauthRouter = require('./routes/ggauth');
// >>>>>>> f1789d0 (Squashed commit of the following:)

var app = express();


require('dotenv').config()
var session = require('express-session');
var passport = require('passport');
//connect database
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://anhtuan:1234@cuoiki-project.up4jo.mongodb.net/cuoiki-project?retryWrites=true&w=majority`, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    })

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter)
app.use('/ggauth', ggauthRouter)



// app.get('/test/', (req, res, next) => {
//   try {
//     var token = req.cookies.token
//     var ketqua = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     if (ketqua) {
//       next()
//     }
//   } catch (error) {
//     return res.json("LOI")
//   }
// }, (req, res, next) => {
//   res.json('WWWWWWWWW')
// })
// <<<<<<< HEAD
// app.use('/login', loginRouter);
// app.use('/admin-create', adminCreateRouter);
// app.use('/timeline', timelineRouter);
// app.use('/noti-page', notiPageRouter);
// app.use('/change-info', changeInfoRouter);
// =======

// >>>>>>> f1789d0 (Squashed commit of the following:)

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
