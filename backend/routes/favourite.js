const express = require('express');
const bodyParser = require('body-parser');
const Favourite = require('../models/Favourite');
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
    const favourite = await Favourite.find({ user: req.user._id }).populate({
      path: 'recipe',
    });
    res.send(favourite);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    await Favourite.deleteMany({ user: req.user._id });
    const favourite = await Favourite.find({ user: req.user._id });
    if (favourite.length === 0) res.status(204).end();
    else {
      res.status(404);
      res.send("We couldn't delete!");
    }
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end('PUT operation not supported on /favourite');
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end('POST operation not supported on /favourite');
  });

router
  .route('/recipes/:recipeId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'GET operation not supported on /favourite/recipes/' + req.params.recipeId
    );
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'DELETE operation not supported on /favourite/recipes/' +
        req.params.recipeId
    );
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'PUT operation not supported on /favourite/recipes/' + req.params.recipeId
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const favourite = new Favourite({
        user: req.user._id,
        recipe: req.params.recipeId,
      });
      await favourite.save();
      res.status(201);
      res.send(favourite);
    } catch {
      res.status(400).send({ error: 'Recipe already in favourites!' });
    }
  });

router
  .route('/:favouriteId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const favourite = await Favourite.findById(
        req.params.favouriteId
      ).populate({ path: 'recipe' });
      res.send(favourite);
    } catch {
      res.status(404);
      res.send({ error: "Favourite doesn't exist!" });
    }
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      await Favourite.deleteOne({ _id: req.params.favouriteId });
      res.status(204).end();
    } catch {
      res.status(404);
      res.send({ error: "Favourite doesn't exist!" });
    }
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    res.status(405);
    res.end(
      'PUT operation not supported on /favourite/' + req.params.favouriteId
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      'POST operation not supported on /favourite/' + req.params.favouriteId
    );
  });

module.exports = router;
