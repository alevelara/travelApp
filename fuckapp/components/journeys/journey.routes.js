const journeyController = require('./journey.controller');
const secureRequest = require('../../middleware/secureRequest');

module.exports = function(app) {
    app.post('/journey',secureRequest.validateSecureRequest, journeyController.addJourney);
    app.put('/journey/:uuidJourney',secureRequest.validateSecureRequest, journeyController.modifyJourney);

    app.get('/journey/all', secureRequest.validateSecureRequest, journeyController.getAllJourneys);
    app.get('/journey/:uuidJourney',secureRequest.validateSecureRequest, journeyController.getJourney);
    app.get('/journey/trip/:uuidTrip',secureRequest.validateSecureRequest, journeyController.getJourneysByUuidTrip);
};  
