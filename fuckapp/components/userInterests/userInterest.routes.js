module.exports = function(app){

    //Controllers
    var userInterests = require('./userInterest.controller');
    var secureRequest = require('../../config/secureRequest');
 
    app.get('/user/:id/interests', secureRequest.validateSecureRequest, userInterests.getUserInterests);
    app.put('/user/:id/interests', secureRequest.validateSecureRequest, userInterests.updateUserInterests);

};