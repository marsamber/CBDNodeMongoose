const express = require('express');
const bodyParser = require('body-parser');
const Cooked = require('../models/Cooked');
const authenticate = require('../authenticate');
const cors = require('./cors');

const router = express.Router();
router.use(bodyParser.json());

router
  .route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    const cooked = await Cooked.find({ user: req.user._id }).populate({
      path: 'recipe',
    });
    res.send(cooked);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    await Cooked.deleteMany({ user: req.user._id });
    const cooked = await Cooked.find({ user: req.user._id });
    if (cooked.length === 0) res.status(204).end();
    else {
      res.status(404);
      res.send("We couldn't delete!");
    }
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end('PUT operation not supported on /cooked');
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end('POST operation not supported on /cooked');
  });

router
  .route('/recipes/:recipeId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'GET operation not supported on /cooked/recipes/' + req.params.recipeId
    );
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'DELETE operation not supported on /cooked/recipes/' + req.params.recipeId
    );
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'PUT operation not supported on /cooked/recipes/' + req.params.recipeId
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const cooked = new Cooked({
        user: req.user._id,
        recipe: req.params.recipeId,
        like: req.body.like,
      });
      await cooked.save();
      res.status(201);
      res.send(cooked);
    } catch {
      res.status(400).send({ error: 'Recipe already cooked!' });
    }
  });

router
  .route('/:cookedId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const cooked = await Cooked.findById(req.params.cookedId).populate({
        path: 'recipe',
      });
      res.send(cooked);
    } catch {
      res.status(404);
      res.send({ error: "Cooked doesn't exist!" });
    }
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      await Cooked.deleteOne({ _id: req.params.cookedId });
      res.status(204).end();
    } catch {
      res.status(404);
      res.send({ error: "Cooked doesn't exist!" });
    }
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const cooked = await Cooked.findOne({ _id: req.params.cookedId });
      if (req.body.like) {
        cooked.like = req.body.like;
      }
      await cooked.save();
      res.send(cooked);
    } catch {
      res.status(404);
      res.send({ error: "Cooked doesn't exist!" });
    }
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end('POST operation not supported on /cooked/' + req.params.cookedId);
  });

module.exports = router;
