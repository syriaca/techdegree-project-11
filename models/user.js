'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({emailAddress: email})
        .exec((error, user) => {
            if (error) { 
                return callback(error);
            } else if (!user) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            if (password === user.password) {
                return callback(null, user)
            } else {
                
            bcrypt.compare(password, user.password, (error, result) => {
                if(result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        }
    });
};

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

let User = mongoose.model('User', UserSchema);

module.exports = User;