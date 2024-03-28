const mongoose = require('mongoose');
const Joi = require('joi'); // for validation

// create Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

}, { timestamps: true});

// Model
const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}