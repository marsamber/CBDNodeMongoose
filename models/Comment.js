const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const commentSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe'
	},
	text: {
		type: String,
        ref: 'Recipe'
	},
	date: {
		type: Date,
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);