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
    .catch(error => callback())
};

exports.updateUserById = function(userId, user, callback){
    User.update(
        {
            full_name: user.full_name,
            username: user.username,
            description: user.description,
            hometown: user.hometown
        },
        {
            where: { id: userId },
            returning: true,
        }
    )
        .then(result => {
            this.findUserById(userId, function (user) {
                console.log(user)
                callback(user)
            })
        })
        .catch(error=> {
            console.log(error)
            callback()}
            );
}