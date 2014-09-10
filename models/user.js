/**
 * user.js - contains mongo db models
 */
var mongoose = require('mongoose');

//define the schema for our user model
var userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String,
    age : Number,
    city : String,
    profession : String,
    salary : Number,
});

exports.UserSchema = userSchema;