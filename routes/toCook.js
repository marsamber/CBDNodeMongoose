const express = require("express");
const bodyParser = require("body-parser");
const ToCook = require("../models/ToCook");
const Fs = require("fs");
const { parse } = require("csv-parse");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .get(authenticate.verifyUser, async (req, res) => {
    const toCook = await ToCook.find({ user: req.user._id });
    res.send(toCook);
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    await ToCook.deleteMany({ user: req.user._id });
    const toCook = await ToCook.find({ user: req.user._id });
    res.send(toCook);
  });

router
  .route("/recipes/:recipeId")
  .post(authenticate.verifyUser, async (req, res) => {
    const toCook = new ToCook({
      user: req.user._id,
      recipe: req.params.recipeId,
      priority: req.body.priority,
    });
    await toCook.save();
    res.send(toCook);
  });

router
  .route("/:tocookId")
  .get(authenticate.verifyUser, async (req, res) => {
    try {
      const toCook = await ToCook.findById(req.params.tocookId);
      res.send(toCook);
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    try {
      await ToCook.deleteOne({ id: req.params.tocookId });
      const toCook = await ToCook.findById(req.params.tocookId);
      res.send(toCook);
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  })
  .patch(authenticate.verifyUser, async (req, res) => {
    try {
      const toCook = await ToCook.findOne({ _id: req.params.tocookId });
      if (req.body.priority) {
        toCook.priority = req.body.priority;
      }
      await toCook.save();
      res.send(toCook);
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  });

module.exports = router;
