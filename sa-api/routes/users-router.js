const express = require('express');
const sendError = require('../utils').sendError;
const replaceId = require('../utils').replaceObjectId;
const createUser = require('../utils').createUser;
const validateUser = require('../utils').validateUser;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const users = await db.collection('users').find().toArray();

        res.json(users.map((el) => {
            replaceId(el);
            return el;
        }));
    } catch (err) {
        sendError(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const params = req.params;
    const userId = req.params.id;
    const mongoId = new ObjectID(userId)
    const db = req.app.locals.db;

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const user = await db.collection('users').findOne({ _id: mongoId });

        if (!user) {
            sendError(req, res, 404, `User with ID=${userId} does not exist`);
            return;
        }

        res.json(user);
    } catch (errors) {
        sendError(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.post('/', createUser);

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const mongoId = new ObjectID(userId)
    const db = req.app.locals.db;

    const oldUser = await db.collection('users').findOne({ _id: mongoId });

    if (!oldUser) {
        sendError(req, res, 404, `User with ID=${userId} does not exist`);
        return;
    }

    const user = req.body;

    if (oldUser._id.toString() !== user.id) {
        sendError(req, res, 400, `User ID=${user.id} does not match URL ID=${userId}`);
        return;
    }

    if (!await validateUser(user, req, res)) return;

    try {
        const r = await db.collection('users').updateOne({ _id: new ObjectID(userId) }, { $set: user });

        if (r.result.ok) {
            replaceId(user)
            res.json(user);
        } else {
            sendError(req, res, 500, `Unable to update user: ${user.id}: ${user.firstName} ${user.lastName}`);
        }
    } catch (err) {
        sendError(req, res, 500, `Unable to update user: ${user.id}: ${user.firstName} ${user.lastName}`, err);
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    const userId = req.params.id;
    const db = req.app.locals.db;
    const mongoId = new ObjectID(userId)

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const oldUser = await db.collection('users').findOne({ _id: mongoId });

        if (!oldUser) {
            sendError(req, res, 404, `User with ID=${userId} does not exist`);
            return;
        }

        const r = await db.collection('users').deleteOne({ _id: mongoId });

        if (r.result.ok && r.deletedCount === 1) {
            res.json(replaceId(oldUser));
        } else {
            sendError(req, res, 500, `Unable to delete user: ${oldUser.id}: ${oldUser.firstName} ${oldUser.lastName}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;