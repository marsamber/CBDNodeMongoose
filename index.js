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
  });
