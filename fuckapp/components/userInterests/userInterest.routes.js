//Controllers
const userInterests = require('./userInterest.controller');
const secureRequest = require('../../config/secureRequest');

module.exports = function(app){

    app.get('/user/:id/interests', secureRequest.validateSecureRequest, userInterests.getUserInterests);
    app.put('/user/:id/interests', secureRequest.validateSecureRequest, userInterests.updateUserInterests);
};