const express = require("express");
const bodyParser = require("body-parser");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const Fs = require("fs");
const { parse } = require("csv-parse");
const authenticate = require("../authenticate");
const cors = require('./cors');
const url = require('url');
const User = require("../models/User");

const router = express.Router();
router.use(bodyParser.json());


router.post("/import", async (req, res) => {
  let inputStream = Fs.createReadStream("./src/dataset.csv", "utf8");

  inputStream
    .pipe(parse({ from_line: 2 }))
    .on("data", (data) => {
      ing = data[2].substring(2, data[2].length - 1).split("', '");
      for (let i = 0; i < ing.length; i++) {
        ing[i] = ing[i].substring(0, ing[i].length - 1);
      }
      var recipe = new Recipe({
        title: data[1],
        ingredients: ing,
        instructions: data[3],
        image: data[4],
      });
      recipe.save((error) => {
        console.log(recipe);
        if (error) throw error;
      });
    })
    .on("end", function () {
      console.log("End of file import");
      res.json({ success: "Data imported successfully.", status: 200 });
    });
});

  router.route("/")
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    const queries = url.parse(req.url,true).query
    const toSearch = queries.search;
    var recipes;
    if(toSearch === undefined) recipes = await Recipe.find();
    else recipes = await Recipe.find({ $or:[{"title": { "$regex": toSearch, "$options": "i" } }, {"ingredients": { "$regex": toSearch, "$options": "i" } } ]});
    res.send(recipes);
  }).delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    var recipes = await Recipe.deleteMany();
    recipes = await Recipe.find();
    if (recipes.length === 0) { res.status(204); res.end(); }
    else { res.status(404); res.send("We couldn't delete!") }
  }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end("PUT operation not supported on /recipes");
  }).post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    if (!req.body.title) {
      res.status(400);
      res.end("You must give a title for your recipe!");
    } else {
      const user = await User.findOne({_id:req.user._id});
      const recipe = new Recipe({
        title: req.body.title,
        instructions: req.body.instructions,
        image: req.body.image,
        ingredients: req.body.ingredients,
      });
      await recipe.save();
      user.recipes.push(recipe);
      await user.save();
      res.status(201);
      res.send(recipe);
    }
  });

router.route("/:id")
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id })
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        });
      res.send(recipe);
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  }).delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id });
      recipe.remove();
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  }).put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id });

      if (req.body.title) {
        recipe.title = req.body.title;
      }

      if (req.body.instructions) {
        recipe.instructions = req.body.instructions;
      }

      if (req.body.image) {
        recipe.image = req.body.image;
      }

      if (req.body.ingredients) {
        recipe.ingredients = req.body.ingredients;
      }

      await recipe.save();
      res.send(recipe);
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  });

router.route("/:recipeId/comments")
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId)
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        })
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(recipe.comments);
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  }).post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.recipeId });
      const comment = new Comment({ comment: req.body.comment, user: req.user._id });
      comment.save();
      recipe.comments.push(comment);
      res.status(201);
      recipe.save().then((recipe) => res.send(comment));
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(405);
    res.end(
      "PUT operation not supported on /recipes/" +
      req.params.recipeId +
      "/comments"
    );
  }).delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.recipeId });
      for (var i = recipe.comments.length - 1; i >= 0; i--) {
        await Comment.deleteOne({ _id: recipe.comments[0] });
        recipe.comments.splice(0, 1);
      }
      res.status(204).end();
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  });

module.exports = router;
