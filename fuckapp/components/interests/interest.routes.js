module.exports = function(app){
    //Controllers
    const interests = require('./interest.controllers');
    const secureRequest = require('../../middleware/secureRequest');
 
    app.get('/interests', secureRequest.validateSecureRequest, interests.getInterests);
};