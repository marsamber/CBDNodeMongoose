const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const recipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	ingredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient'
	}],
	instructions: {
		type: String,
		default: ''
	},
	image: {
		type: String
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("Recipe", recipeSchema);