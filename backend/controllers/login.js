const User_collection = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    User_collection.findOne({ email: req.body.email })
        .then(async (data) => {
            console.log(data);
            if (!data) {
                res.status(401).json({ message: "The user has not been added to the system!" });
                return;
            }
            const isMatch = await bcrypt.compare(req.body.password, data.password);
            if (req.body.email === data.email && isMatch) {
                const payload = {
                    TokenContent: {
                        email: req.body.email
                    },
                };
                const token = jwt.sign(
                    payload,
                    'ishaan',
                    { expiresIn: '7 days' }
                );
                res.status(200).json({ token: token  });
            } else {
                //Respond with unauthorised error if password does not match.
                res.status(401).json({ message: "The entered credentials are Invalid!" });
            }
        })
        .catch(err => {
            res.status(500);
        });
}

module.exports = {
    login
}