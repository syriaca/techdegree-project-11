let auth = require('basic-auth')
let User = require('../models/user');

function authenticateUser(req, res, next) {
    let user = auth(req);

    if(!user) {
        let err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    } else {
        User.authenticate(user.name, user.pass, (err, user) => {
            if(err) {
                let err = new Error();
                err.message = 'Incorrect email or password. Please try again';
                err.status = 403;
                return next(err);
            } else {
                req.authenticateUser = user;
                next();
            }
        })
    }
}

module.exports.authenticateUser = authenticateUser;