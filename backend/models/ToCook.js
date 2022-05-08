const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const toCookSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
	},
	priority: {
		type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
		default: 'LOW'
	}
}, {
    timestamps: true
});

toCookSchema.index({ user: 1, recipe: 1}, { unique: true });

module.exports = mongoose.model("ToCook", toCookSchema);