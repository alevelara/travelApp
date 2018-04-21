const tripUser = require('./tripUser.controller');
const secureRequest = require('../../../middleware/secureRequest');

module.exports = function(app){

    app.get('/trip/:uuid/users', secureRequest.validateSecureRequest, tripUser.getTripUsers);
    app.put('/trip/:uuid/users', secureRequest.validateSecureRequest, tripUser.updateTripUsers);
    
};