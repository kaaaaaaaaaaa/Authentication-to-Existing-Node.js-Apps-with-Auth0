var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// =================================================

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret:
    "Q6iu4rKyYhhDM8T2J9gvXnzya7GBHmEpbtvv1AKm7978cVIrLEOFXckQMSQWNsQQP90jS6EqY537SJgx1nSdYA0hCyhgMjG1H1rc",
  baseURL: "http://localhost:8081",
  clientID: "WJzHJ63MxxsMBgPdW8Bh0ba3ZfwN580q",
  issuerBaseURL: "https://oanhne.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router

// =================================================

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.render("error");
});
app.listen(3000, function () {
  console.log("web listen port 3000");
});
module.exports = app;
