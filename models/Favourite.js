const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const favouriteSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	ingredient: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("Favourite", favouriteSchema);