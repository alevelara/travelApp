
const tripController = require('./trip.controller');
const secureRequest = require('../../middleware/secureRequest');

module.exports = function(app) {
    app.post('/trip',secureRequest.validateSecureRequest, tripController.addTrip);
    app.put('/trip/:uuidTrip',secureRequest.validateSecureRequest, tripController.modifyTrip);

    app.get('/trip/all', secureRequest.validateSecureRequest, tripController.getAllTrips);
    app.get('/trip/:uuidTrip',secureRequest.validateSecureRequest, tripController.getTrip);
    app.get('/trip/user/:uuidUser',secureRequest.validateSecureRequest, tripController.getTripByUserUuid);
};
