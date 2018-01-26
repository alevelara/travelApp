'use strict';

const models = require('../../models');
const User = models['user'];


exports.getAllUsers = function (callback) {
    User.findAll().then(users => callback(users))
};

exports.createUser = function(fullName, email, password, callback) {
    User.create({
            username: fullName,
            email: email,
            full_name: fullName,
            password: password
    })
    .then(user => callback(user))
    .catch(error => callback(error))
};

exports.findUserByEmail = function (email, callback) {
    User.findOne({
        where:{
            email: email
        }
    })
    .then(user => callback(user))
    .catch(error => callback(error))
};

exports.findUserById = function (id, callback) {
    User.findOne({
        where:{
            id: id
        }
    })
    .then(user => callback(user))
    .catch(error => callback(error))
};