const Schema = require('mongoose').Schema;
const User_collection = require('mongoose').model("Users", new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}));

module.exports = User_collection;