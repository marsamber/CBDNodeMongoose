const express = require("express");
const bodyParser = require("body-parser");
const ToBuy = require("../models/ToBuy");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router.route("/")
  .get(authenticate.verifyUser, async (req, res) => {
    const toBuy = await ToBuy.find({ user: req.user._id });
    res.send(toBuy);
  }).post(authenticate.verifyUser, async (req, res) => {
    if (!req.body.ingredient) res.status(400).end("You must give an ingredient!");
    else {
      const toBuy = new ToBuy({
        user: req.user._id,
        priority: req.body.priority,
        ingredient: req.body.ingredient,
      });
      await toBuy.save();
      res.status(201);
      res.send(toBuy);
    }
  }).delete(authenticate.verifyUser, async (req, res) => {
    await ToBuy.deleteMany({ user: req.user._id });
    const toBuy = await ToBuy.find({ user: req.user._id });
    if (toBuy.length === 0) res.status(204).end();
    else { res.status(404); res.send("We couldn't delete!") }
  }).put(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("PUT operation not supported on /toBuy");
  });

router.route("/:toBuyId")
  .get(authenticate.verifyUser, async (req, res) => {
    try {
      const toBuy = await ToBuy.findById(req.params.toBuyId);
      res.send(toBuy);
    } catch {
      res.status(404);
      res.send({ error: "To buy doesn't exist!" });
    }
  }).delete(authenticate.verifyUser, async (req, res) => {
    try {
      await ToBuy.deleteOne({ id: req.params.toBuyId });
      res.send('Deleted');
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  }).put(authenticate.verifyUser, async (req, res) => {
    try {
      const toBuy = await ToBuy.findOne({ _id: req.params.toBuyId });
      if (req.body.priority) {
        toBuy.priority = req.body.priority;
      }
      if (req.body.ingredient) {
        toBuy.ingredient = req.body.ingredient;
      }
      await toBuy.save();
      res.send(toBuy);
    } catch {
      res.status(404);
      res.send({ error: "To buy doesn't exist!" });
    }
  }).post(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("POST operation not supported on /toBuy/" + req.params.toBuyId);
  });

module.exports = router;
