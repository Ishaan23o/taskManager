const User_collection = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const password = 'ishaan';
const atlasURI = 'mongodb+srv://Ishaan:pa7FBiyixZUBqKRb@cluster0.zfxdjvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongoose = require('mongoose');

mongoose.connect(atlasURI).then(() => {
    bcrypt.hash(password, 10).then((pwd) => {
        User_collection.insertMany([{ email: 'ishan23oberoi@gmail.com', password: pwd }])
    })
});