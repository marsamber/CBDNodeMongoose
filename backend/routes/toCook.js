const express = require("express");
const bodyParser = require("body-parser");
const ToCook = require("../models/ToCook");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router.route("/")
  .get(authenticate.verifyUser, async (req, res) => {
    const toCook = await ToCook.find({ user: req.user._id }).populate("recipe");
    res.send(toCook);
  }).delete(authenticate.vesrifyUser, async (req, res) => {
    await ToCook.deleteMany({ user: req.user._id });
    const toCook = await ToCook.find({ user: req.user._id });
    if (toCook.length === 0) res.status(204).end();
    else { res.status(404); res.send("We couldn't delete!") }
  }).put(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("PUT operation not supported on /toCook");
  }).post(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("POST operation not supported on /toCook");
  });

router.route("/recipes/:recipeId")
  .get(authenticate.verifyUser, async (req, res) => {
    res.statusCode = 403;
    res.end(
      "GET operation not supported on /toCook/recipes/" + req.params.recipeId
    );
  }).delete(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("DELETE operation not supported on /toCook/recipes/" + req.params.recipeId);
  }).put(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("PUT operation not supported on /toCook/recipes/" + req.params.recipeId);
  }).post(authenticate.verifyUser, async (req, res) => {
    const toCook = new ToCook({
      user: req.user._id,
      recipe: req.params.recipeId,
      priority: req.body.priority,
    });
    await toCook.save();
    res.status(201);
    res.send(toCook);
  });

router.route("/:toCookId")
  .get(authenticate.verifyUser, async (req, res) => {
    try {
      const toCook = await ToCook.findById(req.params.toCookId).populate({ path: "recipe" });
      res.send(toCook);
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  }).delete(authenticate.verifyUser, async (req, res) => {
    try {
      await ToCook.deleteOne({ id: req.params.toCookId });
      res.status(204).end();
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  }).put(authenticate.verifyUser, async (req, res) => {
    try {
      const toCook = await ToCook.findOne({ _id: req.params.toCookId });
      if (req.body.priority) {
        toCook.priority = req.body.priority;
      }
      await toCook.save();
      res.send(toCook);
    } catch {
      res.status(404);
      res.send({ error: "To cook doesn't exist!" });
    }
  }).post(authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("POST operation not supported on /toCook/" + req.params.toCookId);
  });

module.exports = router;
