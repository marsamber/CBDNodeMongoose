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
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	instructions: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: '#NAME?'
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("Recipe", recipeSchema);