const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, 'ishaan', (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.userFromToken = decoded.TokenContent;
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server failed to parse your token' });
    }
};