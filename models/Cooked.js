const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const cookedSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
	},
	like: {
		type: String,
        enum: ['DISLIKE', 'LIKE'],
		default: 'LIKE'
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("Cooked", cookedSchema);