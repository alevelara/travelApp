const tripInterests = require('./tripInterest.controller');
const secureRequest = require('../../../middleware/secureRequest');

module.exports = function(app){

    app.get('/trip/:uuid/interests', secureRequest.validateSecureRequest, tripInterests.getTripInterests);
    app.put('/trip/:uuid/interests', secureRequest.validateSecureRequest, tripInterests.updateTripInterests);
    
};