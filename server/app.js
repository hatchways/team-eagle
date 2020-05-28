const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

// Auth routes
const registerRouter = require('./routes/auth/register.route');
const loginRouter = require('./routes/auth/login.route');
const logoutRouter = require('./routes/auth/logout.route');
// Poll routes
const pollsRouter = require('./routes/polls/polls.route');

const { json, urlencoded } = express;

const app = express();
const mongoose = require('mongoose'); //For database connection

// Connecting to database. fail if not able to connect
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  // We're connected
  console.log('connected to database');
});

app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes

// Login Routes
app.use('/auth/register', registerRouter);
app.use('/auth/login', loginRouter);
app.use('/auth/logout', logoutRouter);
// Poll Routes
app.use('/polls', pollsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Socket.io works

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
