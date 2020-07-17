const jwt = require('jsonwebtoken');
const { sendError } = require('../utils');
const secret = 'a';
const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const segments = tokenHeader.split(' ');
    if (segments.length !== 2 || segments[0].trim() !== 'Bearer' || segments[1].trim().length < 80) {
        next({ status: 403, message: `No access token provided.` });
        return;
    }
    const token = segments[1].trim();

    jwt.verify(token, secret, function (error, decoded) {
        if (error) {
            sendError(req, res, 403, `Failed to authenticate token.`, error);
            return;
        }
        else {
            req.userId = decoded.id;
            next();
        }
    });
}

module.exports = verifyToken;