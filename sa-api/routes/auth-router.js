const express = require('express');
const router = express.Router();
const replaceId = require('../utils').replaceObjectId;
const sendError = require('../utils').sendError;
const createUser = require('../utils').createUser;
const indicative = require('indicative').validator;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const secret = process.env.SA_SECRET;
const secret = 'a';

router.post('/login', async (req, res) => {
    const db = req.app.locals.db;
    const params = req.body;

    try {
        await indicative.validate(params, {
            userName: 'required|string|min:1',
            password: 'required|string|min:1',
        })

        try {
            const user = await db.collection('users').findOne({ userName: params.userName })

            if (!user || !user.userName) {
                sendError(req, res, 404, `User ${params.userName} not found.`);
                return;
            }

            const passwordIsValid = bcrypt.compareSync(params.password, user.password);

            if (!passwordIsValid) {
                sendError(req, res, 401, 'Wrong password.');
                return;
            }

            token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
            delete user.password;
            replaceId(user);
            res.status(200).json({ auth: true, token, user });

        } catch (err) {
            sendError(req, res, 500, `Server error.`, err)
        }
    } catch (err) {
        sendError(req, res, 400, `Invalid user data: ${err.map(e => e.message).join(', ')}`)
    }
});

router.post('/register', createUser);

module.exports = router;