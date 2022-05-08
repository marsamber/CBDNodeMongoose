const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const favouriteSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
	}
}, {
    timestamps: true
});

favouriteSchema.index({ user: 1, recipe: 1}, { unique: true });

module.exports = mongoose.model("Favourite", favouriteSchema);