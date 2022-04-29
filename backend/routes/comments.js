const express = require("express");
const bodyParser = require("body-parser");
const Comment = require("../models/Comment");
const Recipe = require("../models/Recipe");
const authenticate = require("../authenticate");
const cors = require('./cors');

const router = express.Router();
router.use(bodyParser.json());

router.route("/")
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    const comment = await Comment.find().populate({ path: "user" });
    res.send(comment);
  }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("DELETE operation not supported on /comments");
  }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("PUT operation not supported on /comments");
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("POST operation not supported on /comments");
  });

router.route("/:commentId")
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId }).populate({ path: "user" });
      res.send(comment);
    } catch {
      res.status(404);
      res.send({ error: "Comment doesn't exist!" });
    }
  }).post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    res.status(405);
    res.end(
      "POST operation not supported on /comments/" + req.params.commentId
    );
  }).put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId });
      comment.comment = req.body.comment;
      comment.save().then((comment) => res.send(comment));
    } catch {
      res.status(404);
      res.send({ error: "Comment doesn't exist!" });
    }
  }).delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ comments: { $in: req.params.commentId } });
      var i = recipe.comments.indexOf(req.params.commentId);
      recipe.comments.splice(i, 1);
      recipe.save();
      Comment.findOneAndDelete({ _id: req.params.commentId });
      res.status(204).end();
    } catch {
      res.status(404);
      res.send({ error: "Comment doesn't exist!" });
    }
  });

module.exports = router;
