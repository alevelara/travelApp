const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env_var = require('../../config/var.json');
const userRepository = require('../users/user.repository');

/**
 * Function to generate token
 *
 * @param user User
 * @returns {*}
 */
exports.generateJwt = function(user) {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user.id,
        email: user.email,
        name: user.name,
        exp: expiry.getTime() / 1000,
    }, env_var.development.JWT_KEY);
};

/**
 * Function to controller if password is valid
 *
 * @param password Password
 * @param user User
 * @returns {boolean}
 */
exports.validPassword = function(password, user) {
    console.log("validatePassword  " + user.salt);
    let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha256').toString('hex');
    return user.hash === hash;        
};

/**
 * Function to control if @param newUser already exist in our database
 *
 * @param newUser
 */
exports.checkUserExists = function(newUser) {
    return new Promise(function (fulfill, reject) {
        userRepository.findUserByUsername(newUser.username)
            .then(user => {
                if(user) {
                    reject(`User with username ${newUser.username} already exists`);
                } else {
                    userRepository.findUserByEmail(newUser.email)
                        .then(user => {
                            if(user) {
                                reject(`User with email ${newUser.email} already exists`);
                            } else {
                                fulfill();
                            }
                        });
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};