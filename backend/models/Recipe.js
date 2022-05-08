const mongoose = require('mongoose')
const Schema =  mongoose.Schema;
const Cooked = require('./Cooked');
const Favourite = require('./Favourite');
const ToCook = require('./ToCook');

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

recipeSchema.pre('remove', function(next) {
    Cooked.remove({recipe: this._id}).exec();
    Favourite.remove({recipe: this._id}).exec();
    ToCook.remove({recipe: this._id}).exec();
    next();
});

module.exports = mongoose.model("Recipe", recipeSchema);