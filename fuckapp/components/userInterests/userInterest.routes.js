//Controllers
const userInterests = require('./userInterest.controller');
const secureRequest = require('../../middleware/secureRequest');

module.exports = function(app){

    app.get('/user/:uuid/interests', secureRequest.validateSecureRequest, userInterests.getUserInterests);
    app.put('/user/:uuid/interests', secureRequest.validateSecureRequest, userInterests.updateUserInterests);
    
};