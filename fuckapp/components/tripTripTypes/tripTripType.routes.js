//Controllers
const tripTripType = require('./tripTripType.controller');
const secureRequest = require('../../middleware/secureRequest');

module.exports = function(app){

    app.get('/trip/:uuid/tripType', secureRequest.validateSecureRequest, tripTripType.getTripTripType);
    app.put('/trip/:uuid/tripType', secureRequest.validateSecureRequest, tripTripType.updateTripTripType);
    
};