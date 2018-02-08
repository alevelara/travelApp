'use strict';

const models = require('../../models');
const User = models['user'];


exports.getAllUsers = function (callback) {
    User.findAll({role: 'api'})
    .then(users => callback(users))
    .catch(error => callback(error))
};

exports.createUser = function(queryUser, callback) {
    User.create({
            username: queryUser.username,
            email: queryUser.email,
            full_name: queryUser.full_name,
            password: queryUser.password
    })
    .then(user => callback(user))
    .catch(error => {
        console.log(error)
        callback()
    })
};

exports.findUserByEmail = function (email, callback) {
    User.findOne(
        {where:{email: email}},
        {role: 'api'})
    .then(user => callback(user))
    .catch(error => callback(error))
};

exports.findUserById = function(userId) {
    return User.findOne(
        {where: {id: userId}},
        {role: 'api'})
};

exports.updateUserById = function(userId, user) {
    return User.update({
            full_name: user.full_name,
            username: user.username,
            description: user.description,
            hometown: user.hometown,
            photo_profile_id: user.photo_profile_id
        }, {
            where: {id: userId},
        }
    )
};
