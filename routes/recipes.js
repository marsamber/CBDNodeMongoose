const express = require("express");
const bodyParser = require("body-parser");
const Recipe = require("../models/Recipe");
const Fs = require("fs");
const { parse } = require("csv-parse");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router.post("/recipes/import", async (req, res) => {
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
      console.log(" End of file import");
      res.json({ success: "Data imported successfully.", status: 200 });
    });
});

router
  .route("/recipes")
  .get(async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    await Recipe.deleteMany();
    const recipes = await Recipe.find();
    res.send(recipes);
  })
  .post(authenticate.verifyUser, async (req, res) => {
    const recipe = new Recipe({
      title: req.body.title,
      instructions: req.body.instructions,
      image: req.body.image,
      ingredients: req.body.ingredients,
    });
    await recipe.save();
    res.send(recipe);
  });

router
  .route("/recipes/:id")
  .get(async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id });
      res.send(recipe);
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  })
  .delete(authenticate.verifyUser, async (req, res) => {
    try {
      await Recipe.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Recipe doesn't exist!" });
    }
  })
  .patch(authenticate.verifyUser, async (req, res) => {
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

    router
      .route("/recipes/:reciceId/comments")
      .get((req, res, next) => {
        Recipe.findById(req.params.dishId)
          .populate("comments.author")
          .then(
            (recipe) => {
              if (recipe != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(recipe.comments);
              } else {
                err = new Error("Recipe " + req.params.recipeId + " not found");
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      })
      .post(authenticate.verifyUser, (req, res, next) => {
        Recipe.findById(req.params.recipeId)
          .then(
            (recipe) => {
              if (recipe != null) {
                req.body.author = req.user._id;
                recipe.comments.push(req.body);
                recipe.save().then(
                  (recipe) => {
                    Recipe.findById(recipe._id)
                      .populate("comments.author")
                      .then((recipe) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(recipe);
                      });
                  },
                  (err) => next(err)
                );
              } else {
                err = new Error("Recipe " + req.params.recipeId + " not found");
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      })
      .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(
          "PUT operation not supported on /recipes/" +
            req.params.recipeId +
            "/comments"
        );
      })
      .delete(authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
          .then(
            (dish) => {
              if (dish != null) {
                for (var i = dish.comments.length - 1; i >= 0; i--) {
                  dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save().then(
                  (dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                  },
                  (err) => next(err)
                );
              } else {
                err = new Error("Dish " + req.params.dishId + " not found");
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      });

    router
      .route("/recipes/:recipeId/comments/:commentId")
      .get((req, res, next) => {
        Recipe.findById(req.params.recipeId)
          .populate("comments.author")
          .then(
            (recipe) => {
              if (
                recipe != null &&
                recipe.comments.id(req.params.commentId) != null
              ) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(recipe.comments.id(req.params.commentId));
              } else if (recipe == null) {
                err = new Error("Recipe " + req.params.recipeId + " not found");
                err.status = 404;
                return next(err);
              } else {
                err = new Error(
                  "Comment " + req.params.commentId + " not found"
                );
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      })
      .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(
          "POST operation not supported on /recipes/" +
            req.params.recipeId +
            "/comments/" +
            req.params.commentId
        );
      })
      .put(authenticate.verifyUser, (req, res, next) => {
        Recipes.findById(req.params.recipeId)
          .then(
            (recipe) => {
              if (
                recipe != null &&
                recipe.comments.id(req.params.commentId) != null
              ) {
                if (req.body.rating) {
                  recipe.comments.id(req.params.commentId).rating =
                    req.body.rating;
                }
                if (req.body.comment) {
                  recipe.comments.id(req.params.commentId).comment =
                    req.body.comment;
                }
                recipe.save().then(
                  (recipe) => {
                    Recipe.findById(recipe._id)
                      .populate("comments.author")
                      .then((recipe) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(recipe);
                      });
                  },
                  (err) => next(err)
                );
              } else if (recipe == null) {
                err = new Error("Recipe " + req.params.recipeId + " not found");
                err.status = 404;
                return next(err);
              } else {
                err = new Error(
                  "Comment " + req.params.commentId + " not found"
                );
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      })
      .delete(authenticate.verifyUser, (req, res, next) => {
        Recipe.findById(req.params.recipeId)
          .then(
            (recipe) => {
              if (
                recipe != null &&
                recipe.comments.id(req.params.commentId) != null
              ) {
                recipe.comments.id(req.params.commentId).remove();
                recipe.save().then(
                  (recipe) => {
                    Recipe.findById(recipe._id)
                      .populate("comments.author")
                      .then((recipe) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(recipe);
                      });
                  },
                  (err) => next(err)
                );
              } else if (recipe == null) {
                err = new Error("Recipe " + req.params.recipeId + " not found");
                err.status = 404;
                return next(err);
              } else {
                err = new Error(
                  "Comment " + req.params.commentId + " not found"
                );
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      });
  });

module.exports = router;
