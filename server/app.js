const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

// Users routes
const usersRouter = require('./routes/users/users.route');
// Auth routes
const authRouter = require('./routes/auth/auth.route');
// Poll routes
const pollsRouter = require('./routes/polls/polls.route');
// Friends routes
const friendsRouter = require('./routes/users/friends/friends.route');

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

// Users Routes
app.use('/users', usersRouter);
// Auth Routes
app.use('/auth', authRouter);
// Poll Routes
app.use('/polls', pollsRouter);
// Friends Routes
app.use('/users/:userId/friends', friendsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
