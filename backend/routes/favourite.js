const express = require('express');
const bodyParser = require('body-parser');
const Favourite = require('../models/Favourite');
const Fs = require('fs');
const { parse } = require('csv-parse');
const authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .get(authenticate.verifyUser, async (req, res) => {
        const favourite = await Favourite.find({ user: req.user._id });
        res.send(favourite);
    }).delete(authenticate.verifyUser, async (req, res) => {
        await Favourite.deleteMany({ user: req.user._id });
        const favourite = await Favourite.find({ user: req.user._id });
        res.send(favourite);
    });

router.route('/recipes/:recipeId')
    .post(authenticate.verifyUser, async (req, res) => {
        const favourite = new Favourite({
            user: req.user._id,
            recipe: req.params.recipeId,
        });
        await favourite.save();
        res.send(favourite);
    });

router.route('/:favouriteId')
    .get(authenticate.verifyUser, async (req, res) => {
        try {
            const favourite = await Favourite.findById(req.params.favouriteId);
            res.send(favourite);
        } catch {
            res.status(404);
            res.send({ error: "Favourite doesn't exist!" });
        }
    }).delete(authenticate.verifyUser, async (req, res) => {
        try {
            await Favourite.deleteOne({ id: req.params.favouriteId });
            const favourite = await Favourite.findById(req.params.favouriteId);
            res.send(favourite);
        } catch {
            res.status(404);
            res.send({ error: "Favourite doesn't exist!" });
        }
    }).patch(authenticate.verifyUser, async (req, res) => {
        try {
            const favourite = await Favourite.findOne({ _id: req.params.favouriteId });
            if (req.body.like) {
                favourite.like = req.body.like;
            }
            await favourite.save();
            res.send(favourite);
        } catch {
            res.status(404);
            res.send({ error: "Favourite doesn't exist!" });
        }
    });

module.exports = router;