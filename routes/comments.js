const express = require("express");
const bodyParser = require("body-parser");
const Cooked = require("../models/Cooked");
const Fs = require("fs");
const { parse } = require("csv-parse");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/:commentId")
  .get(async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId });
      res.send(comment);
    } catch {
      res.status(404);
      res.send({ error: "Comment doesn't exist!" });
    }
  })
  .post(authenticate.verifyUser, async (req, res) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /comments/" + req.params.commentId
    );
  })
  .put(authenticate.verifyUser, async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId });
      comment.body = req.body.body;
      comment.save().then((comment) => res.send(comment));
    } catch {
      res.status(404);
      res.send({ error: "Comment doesn't exist!" });
    }
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    try {
      Comment.findOneAndDelete({ _id: req.params.commentId });
      res.send("Deleted");
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  });

module.exports = router;
