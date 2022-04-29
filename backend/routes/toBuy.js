const express = require("express");
const bodyParser = require("body-parser");
const ToBuy = require("../models/ToBuy");
const Fs = require("fs");
const { parse } = require("csv-parse");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .get(authenticate.verifyUser, async (req, res) => {
    const toBuy = await ToBuy.find({ user: req.user._id });
    res.send(toBuy);
  })
  .post(authenticate.verifyUser, async (req, res) => {
    const toBuy = new ToBuy({
      user: req.user._id,
      priority: req.body.priority,
      ingredient: req.body.ingredient,
    });
    await toBuy.save();
    res.send(toBuy);
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    await ToBuy.deleteMany({ user: req.user._id });
    const toBuy = await ToBuy.find({ user: req.user._id });
    res.send(toBuy);
  });

router
  .route("/:tobuyId")
  .get(authenticate.verifyUser, async (req, res) => {
    try {
      const toBuy = await ToBuy.findById(req.params.tobuyId);
      res.send(toBuy);
    } catch {
      res.status(404);
      res.send({ error: "To buy doesn't exist!" });
    }
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    try {
      await ToBuy.deleteOne({ id: req.params.tobuyId });
      res.send('Deleted');
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  })
  .patch(authenticate.verifyUser, async (req, res) => {
    try {
      const toBuy = await ToBuy.findOne({ _id: req.params.tobuyId });
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
  });

module.exports = router;
