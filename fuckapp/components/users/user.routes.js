const users = require('./user.controller');
const userUtil = require('./user.utils');
const secureRequest = require('../../config/secureRequest');

module.exports = function(app){

<<<<<<< HEAD
    app.get('/users', secureRequest.validateSecureRequest, users.getAllUsers);

    app.get('/user/:id', secureRequest.validateSecureRequest, users.getUser);
    app.put('/user/:id', secureRequest.validateSecureRequest, users.updateUser);

    app.get('/user/:id/interests', secureRequest.validateSecureRequest, users.getUserInterests);
   // app.get('/user/interests', secureRequest.validateSecureRequest, users.updateUserInterest);

    app.route('/user/password/recovery')
        .post(users.sendEmailUserPassword);

    app.route('/user/password/reset')
        .post(users.resetPassword);
    
    app.post('/user/search', secureRequest.validateSecureRequest, users.searchByName);
=======
    app.get('/users', validateSecureRequest, users.getAllUsers);
    app.get('/user/:id', validateSecureRequest, users.getUser);
    app.put('/user/:id', validateSecureRequest, users.updateUser);
    app.get('/user/:id/interests', validateSecureRequest, users.getUserInterests);
    app.get('/user/:id/interests', validateSecureRequest, users.updateUserInterest);
    app.post('/user/password/recovery', validateSecureRequest , users.sendEmailToUserWithResetPasswordToken);
    app.post('/user/password/reset', validateSecureRequest , users.resetPassword);
    app.post('/user/search', validateSecureRequest, users.searchByName);
>>>>>>> dae16c7a5e9083065daff62d61928ad3e9fe8df1
};
