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
<<<<<<< HEAD
<<<<<<< 09e478d091337711a41c1f8c4e1f93031deb9159
            description: user.description
=======
            description: user.description,
            photo_profile_id: user.photo_profile_id
>>>>>>> Add support for uploading/downloading photos.
=======
            description: user.description,
            photo_profile_id: user.photo_profile_id
>>>>>>> d5aaa805f732ace498ec3a7bec3eef1904f3d503
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
<<<<<<< HEAD
<<<<<<< 09e478d091337711a41c1f8c4e1f93031deb9159
            );
}
=======
        );
}
>>>>>>> Add support for uploading/downloading photos.
=======
        );
}
>>>>>>> d5aaa805f732ace498ec3a7bec3eef1904f3d503
