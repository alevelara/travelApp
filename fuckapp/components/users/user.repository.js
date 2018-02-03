
'use strict';

const models = require('../../models');
const User = models['user'];


exports.getAllUsers = function (callback) {
    User.findAll()
    .then(users => callback(users))
    .catch(error => callback(error))
};

exports.createUser = function(queryUser, callback) {
    User.create({
            username: queryUser.fullName,
            email: queryUser.email,
            full_name: queryUser.fullName,
            password: queryUser.password
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

exports.updateUserById = function(user, callback){
    User.update({ full_name: user.name },
    { where:{ id: user.id } })
    .then(user => callback(user))
    .catch(error=> {
        
        callback(error)});
}