'use strict';

const models = require('../../models');
const User = models.user;
const Interest = models.interest;
const UserInterest = models.userInterest;
const userInterestSequelize = UserInterest.sequelize;

exports.getAllUsers =  function (callback) {
    User.findAll()
    .then(users => callback(users))
    .catch(error => callback(error));
};

exports.createUser = function(queryUser, callback) {
    User.create({
            username: queryUser.username,
            email: queryUser.email,
            full_name: queryUser.full_name,
            password: queryUser.password
    })
    .then(user => callback(user))
    .catch(error => callback(error));    
};

exports.findUserByEmail = function (email, callback) {
    User.findOne({
        where:{
            email: email
        }
    })
    .then(user => callback(user))
    .catch(error => callback(error));
};

exports.findUserById = function (id, callback) {
    User.findOne({
        where:{
            id: id
        }
    })
    .then(user => callback(user))
    .catch(error => callback());
};

exports.updateUserById = function(userId, user, callback){
    User.update(
        {
            full_name: user.full_name,
            username: user.username,
            description: user.description
        },
        {
            where: { id: userId },
            returning: true,
        }
    )
        .then(result => {
            this.findUserById(userId, function (user) {                
                callback(user);
            });
        })
        .catch(error =>  callback(error));            
};

exports.getInterestsByUserId = function(userId, callback){        
    
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userinterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id';
    userInterestSequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: userInterestSequelize.QueryTypes.SELECT        
    })
    .then(interests => callback(interests))
    .catch(error => callback(error));
  
};