const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
var passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, (req, res, next) => {
    User.find({}).then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
      .catch((err) => next(err));
  }).delete(cors.cors, async (req, res) => {
    await User.deleteMany();
    const users = await User.find();
    if (users.length === 0) { res.status(204); res.end(); }
    else { res.status(404); res.send("We couldn't delete!") }
  }).put(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only GET operation supported on /users");
  }).post(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only GET operation supported on /users");
  });

router.route('/:id')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate({
          path: "recipes"
        });
      res.send(user);
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
  });

router.route('/username/:username')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username })
        .populate({
          path: "recipes"
        });
      res.send(user);
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
  });

router.route('/signup')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .post(cors.cors, (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        if (req.body.email) user.email = req.body.email;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
  }).delete(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/signup");
  }).put(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/signup");
  }).get(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/signup");
  });

router.route('/login')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .post(cors.cors, passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
  }).delete(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/login");
  }).put(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/login");
  }).get(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only POST operation supported on /users/login");
  });

router.route('/edit')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.user).then((user) => {
      if (req.body.email)
        user.email = req.body.email;
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save().then((user) => {
        User.findById(req.user).then((user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(user);
        });
      }, (err) => next(err));
    }, (err) => next(err))
      .catch((err) => next(err));
  }).delete(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only PUT operation supported on /users/edit");
  }).post(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only PUT operation supported on /users/edit");
  }).get(cors.cors, (req, res) => {
    res.status(405);
    res.end("Only PUT operation supported on /users/edit");
  });

module.exports = router;