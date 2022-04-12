const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('../models/Recipe');
const Fs = require('fs');
const { parse } = require('csv-parse');
const authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());

router.post('/recipes/import', async (req, res) => {
    let inputStream = Fs.createReadStream('./src/dataset.csv', 'utf8');

    inputStream
        .pipe(parse({ from_line: 2 }))
        .on('data', (data) => {
            ing = data[2].substring(2, data[2].length - 1).split("', '");
            for (let i = 0; i < ing.length; i++) {
                ing[i] = ing[i].substring(0, ing[i].length - 1);
            }
            var recipe = new Recipe({
                title: data[1],
                ingredients: ing,
                instructions: data[3],
                image: data[4]
            });
            recipe.save((error) => {
                console.log(recipe);
                if (error) throw error;
            });
        }).on("end", function () {
            console.log(" End of file import");
            res.json({ success: "Data imported successfully.", status: 200 });
        });
});

router.route('/recipes').get(async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
}).delete(authenticate.verifyUser, async (req, res) => {
    await Recipe.deleteMany();
    const recipes = await Recipe.find();
    res.send(recipes);
}).post(authenticate.verifyUser, async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        instructions: req.body.instructions,
        image: req.body.image,
        ingredients: req.body.ingredients
    });
    await recipe.save();
    res.send(recipe);
});

router.route('/recipes/:id').get(async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        res.send(recipe);
    } catch {
        res.status(404);
        res.send({ error: "Recipe doesn't exist!" });
    }
}).delete(authenticate.verifyUser, async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Recipe doesn't exist!" });
    }
}).patch(authenticate.verifyUser, async (req, res) => {
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

module.exports = router;