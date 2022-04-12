const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const recipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	ingredients: [{
		type: String
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