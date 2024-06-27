const Schema = require('mongoose').Schema;
const Task_collection = require('mongoose').model("Tasks", new Schema({
    email: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    }
}));

module.exports = Task_collection;