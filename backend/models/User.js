const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const ToBuy = require('./ToBuy');

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
}, {
    timestamps: true
});

userSchema.pre('remove', function(next) {
    ToBuy.remove({user: this._id});
    Favourite.remove({user: this._id});
    ToCook.remove({user: this._id});
    Cooked.remove({user: this._id});
    next();
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);