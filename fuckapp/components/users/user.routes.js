const users = require('./user.controller');
const userUtil = require('./user.utils');
const secureRequest = require('../../config/secureRequest');

module.exports = function(app){

    app.get('/users', secureRequest.validateSecureRequest, users.getAllUsers);

    app.get('/user/:id', secureRequest.validateSecureRequest, users.getUser);
    app.put('/user/:id', secureRequest.validateSecureRequest, users.updateUser);
    app.route('/user/password/recovery')
        .post(users.sendEmailUserPassword);

    app.route('/user/password/reset')
        .post(users.resetPassword);
    
    app.post('/user/search', secureRequest.validateSecureRequest, users.searchByName);
};
