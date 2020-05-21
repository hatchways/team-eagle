const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
// Auth routes
const registerRouter = require("./routes/auth/register.route");
const loginRouter = require("./routes/auth/login.route");
// Poll routes
const addPollRouter = require("./routes/polls/add.route");
const deletePollRouter = require("./routes/polls/delete.route");

const { json, urlencoded } = express;

const app = express();
const mongoose = require("mongoose"); //For database connection

// Connecting to database. fail if not able to connect
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	// We're connected
	console.log("connected to database");
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/", indexRouter);
app.use("/ping", pingRouter);
// Login Routes
app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);
// Polls backend routes
app.use("/polls/add", addPollRouter);
app.use("/polls/delete", deletePollRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

module.exports = app;
