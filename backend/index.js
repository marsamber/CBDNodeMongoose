const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authenticate = require("./authenticate");
const logger = require("morgan");
const config = require("./config");

const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");
const commentsRouter = require("./routes/comments");
const toCookRouter = require("./routes/toCook");
const toBuyRouter = require("./routes/toBuy");
const cookedRouter = require('./routes/cooked');
const favouriteRouter = require('./routes/favourite');
  
mongoose.connect(config.mongoUrl, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(passport.initialize());
  app.use("/users", usersRouter);
  app.use("/api/recipes", recipesRouter);
  app.use("/api/comments", commentsRouter);
  app.use("/api/toCook", toCookRouter);
  app.use("/api/toBuy", toBuyRouter);
  app.use("/api/cooked", cookedRouter);
  app.use("/api/favourite", favouriteRouter);

  app.listen(5000, () => {
    console.log("Server has started!");
  });

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
});
