'use strict';

var models = require('../../models');
var User = models['user'];
var Sequelize = require('../../server').sequelize;
var Op = Sequelize.Op;



exports.getAllUsers = function (callback) {
    User.findAll({role: 'api'})
    .then(users => callback(users))
    .catch(error => callback(error));
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

exports.findUserByUsername = function (username) {
    return User.findOne(
        {where:{username: username}},
        {role: 'api'});
};

exports.findUserById = function(userId) {
    return User.findOne(
        {where: {id: userId}},
        {role: 'api'});
};

exports.matchUserByUserName = function(name, offset) {
    return Sequelize.query(`SELECT * FROM users where full_name like :name OR username like :name LIMIT 20 OFFSET ${offset}`,
        { replacements: { name: '%' + name + '%' , offset : offset }, 
        type: Sequelize.QueryTypes.SELECT });
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
        .then(result => {
            this.findUserById(userId, function (user) {                
                callback(user);
            });
        })
        .catch(error =>  callback(error));            
};

exports.getInterestsByUserId = function(userId){        
    
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userinterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id';
    Sequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: Sequelize.QueryTypes.SELECT        
    })
    .then(interests => callback(interests))
    .catch(error => callback(error));
  
};
