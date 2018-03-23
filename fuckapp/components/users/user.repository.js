'use strict';

const models = require('../../models');
const User = models['user'];
const Sequelize = require('../../server').sequelize;

/**
 * Get all users
 *
 */
exports.getAllUsers = function () {
    
    return User.findAll();
};

/**
 * Create User
 *
 * @param newUser User to create
 */
exports.createUser = function(newUser) {
    return User.create({
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
        password: newUser.password
    });
};

/**
 * Get User filtered by userId
 *
 * @param userId User Id to for filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findUserByUuid = function(userUuid) {
    return User.findOne({
        where: {
            uuid: userUuid
        },
        include: 'Interests'
    });
};

/**
 * Get User filtered by email
 *
 * @param email Email to filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findUserByEmail = function (email) {
    return User.findOne(
        {where:{email: email}},
        {role: 'api'});
};

/**
 * Find User by email and reset password token
 *
 * @param email Email
 * @param resetPassWordToken Reset password token
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findUserByEmailAndResetPasswordToken = function (email, resetPassWordToken) {
    return User.findOne(
        {   where:  {
            email: email,
            reset_password_token:resetPassWordToken
        }});
};

/**
 * Find User by name
 *
 * @param username Name for filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findUserByUsername = function (username) {
    return User.findOne(
        {where:{username: username}},
        {role: 'api'});
};

/**
 * Get all users who his name contains @param name
 *
 * @param name Name for filter
 * @param offset Offset of database
 * @returns {Promise}
 */
exports.matchUserByUserName = function(name, offset) {
    let query = `SELECT * FROM users where full_name like :name OR username like :name LIMIT 20 OFFSET ${offset}`;

    return Sequelize.query(query, { replacements: {
            name: '%' + name + '%' ,
            offset : offset
        },
        type: Sequelize.QueryTypes.SELECT });
};

/**
 * Update user with id equals @param userId
 *
 * @param userUuid User Id for filter
 * @param user User
 */
exports.updateUserByUuid = function(userUuid, user) {
    return User.update({
            full_name: user.full_name,
            username: user.username,
            description: user.description,
            hometown: user.hometown,
            photo_profile_id: user.photo_profile_id
        }, {
            where: {uuid: userUuid},
        }
    );       
};

/**
 * Update User password fitered by userId
 *
 * @param userUuid UserUuid to filter
 * @param password Password for update
 */
exports.updateUserPasswordByUuid = function(userUuid, password) {
    return User.update({
            password: password
        }, {
            where: {uuid: userUuid},
        }
    );
};

/**
 * Update reset password token to user filtered by id
 *
 * @param uuid User uuid
 * @param resetPassWordToken Reset password token to update
 */
exports.updateUserResetPassWordTokenByUuid = function(uuid , resetPassWordToken) {
    return User.update({
        reset_password_token: resetPassWordToken
    }, {
        where: {uuid : uuid},
    });
};


