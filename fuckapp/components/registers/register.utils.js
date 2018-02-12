const models = require('../../models');
const user = models.user;

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env_var = require('../../config/var.json');

var logger = require('../../components/logger/logger');

exports.getUserByEmail = function(username, callback){
    logger.debug(username);
    user.findOne({email: username}, function(err, user){
        logger.debug(user);
        if(err){                       
            logger.error(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

exports.generateJwt = function(user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user.id,
        email: user.email,
        name: user.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, env_var.development.JWT_KEY);
};

exports.validPassword = function(password, user) {
    console.log("validatePassword  " + user.salt);
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha256').toString('hex');
    return user.hash === hash;        
};


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