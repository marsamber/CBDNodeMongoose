const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const toBuySchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	ingredient: {
		type: String,
		required: true
	},
	priority: {
		type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
		default: 'LOW'
	}
}, {
    timestamps: true
});

module.exports = mongoose.model("ToBuy", toBuySchema);