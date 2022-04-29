const express = require('express');
const bodyParser = require('body-parser');
const Cooked = require('../models/Cooked');
const Fs = require('fs');
const { parse } = require('csv-parse');
const authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .get(authenticate.verifyUser, async (req, res) => {
        const cooked = await Cooked.find({ user: req.user._id });
        res.send(cooked);
    }).delete(authenticate.verifyUser, async (req, res) => {
        await Cooked.deleteMany({ user: req.user._id });
        const cooked = await Cooked.find({ user: req.user._id });
        res.send(cooked);
    });

router.route('/recipes/:recipeId')
    .post(authenticate.verifyUser, async (req, res) => {
        const cooked = new Cooked({
            user: req.user._id,
            recipe: req.params.recipeId,
            like: req.body.like
        });
        await cooked.save();
        res.send(cooked);
    });

router.route('/:cookedId')
    .get(authenticate.verifyUser, async (req, res) => {
        try {
            const cooked = await Cooked.findById(req.params.cookedId);
            res.send(cooked);
        } catch {
            res.status(404);
            res.send({ error: "Cooked doesn't exist!" });
        }
    }).delete(authenticate.verifyUser, async (req, res) => {
        try {
            await Cooked.deleteOne({ id: req.params.cookedId });
            const cooked = await Cooked.findById(req.params.cookedId);
            res.send(cooked);
        } catch {
            res.status(404);
            res.send({ error: "Cooked doesn't exist!" });
        }
    }).patch(authenticate.verifyUser, async (req, res) => {
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
    });

module.exports = router;