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

// function to validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).email().required(),
        userName: Joi.string().trim().min(3).max(200).required(),
        password: Joi.string().trim().min(6).required(),
        isAdmin: Joi.bool()
    })
    return schema.validate(obj);
    
}

// function to validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).email().required(),
        password: Joi.string().trim().min(6).required()
    })
    return schema.validate(obj);
    
}
// function to validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).email(),
        userName: Joi.string().trim().min(3).max(200),
        password: Joi.string().trim().min(6),
        isAdmin: Joi.bool()
    })
    return schema.validate(obj);
    
}



module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}