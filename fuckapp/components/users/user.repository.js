'use strict';

const models = require('../../models');
const User = models['user'];


exports.getAllUsers = function (callback) {
    User.findAll({role: 'api'})
    .then(users => callback(users))
    .catch(error => callback(error))
};

exports.createUser = function(newUser) {
    return User.create({
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
        password: newUser.password
    });
};

exports.findUserByEmail = function (email) {
    return User.findOne(
        {where:{email: email}},
        {role: 'api'});
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
