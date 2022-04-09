const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./authenticate');
const logger = require('morgan');
const routes = require("./routes/routes");
const config = require('./config');

const usersRouter = require('./routes/users');

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(passport.initialize());
    app.use('/users', usersRouter);
    app.use("/api", routes)

    app.listen(5000, () => {
      console.log('Server has started!');
    });

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
  });
