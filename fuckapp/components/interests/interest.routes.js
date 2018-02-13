module.exports = function(app){

    //Controllers
    var interests = require('./interest.controllers');
    var secureRequest = require('../../config/secureRequest');
 
    app.get('/interests', secureRequest.validateSecureRequest, interests.getInterests);
};