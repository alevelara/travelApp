const users = require('./user.controller');
const userUtil = require('./user.utils');

module.exports = function(app){

    app.get('/users', validateSecureRequest, users.getAllUsers);

    app.get('/user/:id', validateSecureRequest, users.getUser);
    app.put('/user/:id', validateSecureRequest, users.updateUser);

    app.get('/user/:id/interests', validateSecureRequest, users.getUserInterests);
    app.get('/user/:id/interests', validateSecureRequest, users.updateUserInterest);

    app.route('/user/password/recovery')
        .post(users.sendEmailUserPassword);

    app.route('/user/password/reset')
        .post(users.resetPassword);
};


function validateSecureRequest(req, res, next) {
    const token = req.headers.auth_token;
    const result = {
        payload: null,
        status: 0,
        message: ""
    };

    try {
        userUtil.verifyUser(token,result);
    } catch(error) {
        return res.status(result.status).json({error_message: error.message});
    }
    next();
}