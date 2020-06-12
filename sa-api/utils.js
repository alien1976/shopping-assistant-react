const indicative = require('indicative');
const bcrypt = require('bcrypt');

const sendError = (req, res, statusCode, message, err) => {
    console.log(`Error: ${message}\nStatus code: ${statusCode}`);
    console.log(err);

    if (req.app.get('env') === 'development') {
        res.status(statusCode || 500).json({
            message: message || err.message,
            error: err || {}
        });
    } else {
        res.status(statusCode || 500).json({
            message: message || err.message,
            error: {}
        });
    }
}

exports.sendError = sendError;

const replaceObjectId = (obj) => {
    if (!obj || obj.id !== undefined) return;

    obj.id = obj._id;
    delete (obj._id);
}

exports.replaceObjectId = replaceObjectId;

const removeProp = (obj, propToRemove) => {
    if (!obj || obj[propToRemove] === undefined) return;

    delete obj[propToRemove];
}

exports.removeProp = removeProp;

const createUser = async (req, res) => {
    const db = req.app.locals.db;
    const user = req.body;

    if (!await validateUser(user, req, res)) return;

    const dbCount = await db.collection('users').countDocuments();

    if (!user.role) {
        user.role = dbCount === 0 ? "Admin" : "User";
    }

    const isUserNameExists = await db.collection('users').findOne({ userName: user.userName });
    if (isUserNameExists) {
        sendError(req, res, 400, `User name: ${user.userName} already exists`)
        return;
    }

    const isEmailExists = await db.collection('users').findOne({ email: user.email })
    if (isEmailExists) {
        sendError(req, res, 400, `User with email: ${user.email} has been already registered`)
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    try {
        const dbRes = await db.collection('users').insertOne(user)

        if (!dbRes.result.ok || dbRes.insertedCount !== 1) {
            sendError(req, res, 500, `Unable to create user: ${user.userName}`)
        }
        replaceObjectId(user);
        res.status(201).location(`/users/${user.id}`).json(user);
    } catch (err) {
        sendError(req, res, 500, `Unable to create user: ${user.userName}`)
    }
}

exports.createUser = createUser;

const validateUser = async (user, req, res, validatePassword = true) => {
    try {
        const validationConfig = {
            userName: 'required|string|min:1',
            password: 'required|string|min:4',
            firstName: 'required|string|min:1',
            lastName: 'required|string|min:1',
            email: 'required|email',
        }
        if (!validatePassword) delete validationConfig.password;

        await indicative.validator.validate(user, validationConfig)

        return true;
    } catch (error) {
        sendError(req, res, 400, `Invalid user data: ${error.map(e => e.message).join(', ')}`, error);
        return false;
    }
}

exports.validateUser = validateUser;