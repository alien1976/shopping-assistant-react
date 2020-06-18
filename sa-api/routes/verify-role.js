const mongodb = require('mongodb');
const replaceId = require('../utils').replaceObjectId;

const verifyRoleOrSelf = (roles) => {
    return function (req, res, next) {
        const userId = req.userId;
        const db = req.app.locals.db;
        if (!userId) next({ status: 403, message: `No userId provided.` });
        else {
            db.collection('users').findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
                if (error) next({ status: 500, message: `Server error.`, error });
                else if (!user) next({ status: 404, message: `User not found.` });
                else {
                    if (roles.findIndex(r => r === user.role) < 0)
                        next({ status: 403, message: `Not enough privilegies for this operation.` });
                    else {
                        delete user.password;
                        replaceId(user);
                        req.user = user;
                        next();
                    }
                }
            });
        }
    }
}

module.exports = verifyRoleOrSelf;