module.exports = function(app){
    //Controllersconst
    const interests = require('./interest.controllers');
    const secureRequest = require('../../config/secureRequest');
 
    app.get('/interests', secureRequest.validateSecureRequest, interests.getInterests);
};