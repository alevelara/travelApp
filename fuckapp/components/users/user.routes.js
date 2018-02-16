const users = require('./user.controller');
const userUtil = require('./user.utils');
const secureRequest = require('../../config/secureRequest');

module.exports = function(app){

    app.get('/users', secureRequest.validateSecureRequest, users.getAllUsers);
    app.get('/user/:id', secureRequest.validateSecureRequest, users.getUser);
    app.put('/user/:id', secureRequest.validateSecureRequest, users.updateUser);
    app.post('/user/password/recovery', users.sendEmailToUserWithResetPasswordToken);
    app.post('/user/password/reset', users.resetPassword);
    app.post('/user/search', secureRequest.validateSecureRequest, users.searchByName);
};
