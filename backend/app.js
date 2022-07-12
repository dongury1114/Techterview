var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();

const { sequelize } = require('./models');

// sequelize.sync({ force: false })
//     .then(() => {
//         console.log('DataBase connected');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());

app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
