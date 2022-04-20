const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('../models/Recipe');
const Fs = require('fs');
const { parse } = require('csv-parse');
const authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());

router.post('/comment/new', async (req, res) => {
    let date=new Date();
    var comment = new Comment({
        user: req.body.user, //await User.findOne({ _id: req.body.userid });
        recipe: req.body.recipe,
        text: req.body.text,
        date: date.getDate(),
    });
    comment.save((error) => {
        console.log(comment);
        if (error) throw error;
    });
  });

router.route('/comment/:id').get(async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        res.send(comment);
    } catch {
        res.status(404);
        res.send({ error: "Recipe doesn't exist!" });
    }
}).delete(authenticate.verifyUser, async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Comment doesn't exist!" });
    }
}).patch(authenticate.verifyUser, async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });

        if (req.body.text) {
            comment.text = req.body.text;
        }

        await comment.save();
        res.send(comment);
    } catch {
        res.status(404);
        res.send({ error: "Recipe doesn't exist!" });
    }
});

module.exports = router;