const journeyRepository = require('./journey.repository');

exports.addJourney = function(req, res){
    const journey = req.body.journey;
    
    journeyRepository.createTrip(journey)
    .then(journey => res.status(200).json({"journey": journey}))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.modifyJourney = function(req, res){
    const journey = req.body.journey;
    const uuidJourney = req.params.uuidJourney;

    journeyRepository.updateTrip(uuidJourney, trip)
    .then(() => res.status(200))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.getAllJourneys = function(req, res){    
    journeyRepository.getAllJourneys()
    .then(journey => res.status(200).json({"journey": journey}))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.getJourneyByTripUuid = function(req, res){
    const uuidJourney = req.params.uuidJourney;

    journeyRepository.getJourneyByUuidTrip(uuidJourney)
    .then(journeys => res.status(200).json({"journeys": journeys}))
    .catch(error => res.status(500).json({"error": error.message}));
};  

exports.getJourney = function(req, res){
    const uuidJourney = req.params.uuidJourney;

    journeyRepository.getTrip(uuidJourney)
    .then(journey => res.status(200).json({"journey": journey}))
    .catch(error => res.status(500).json({"error": error.message}));
};  

exports.removeJourney = function(req, res){
    const uuidJourney = req.params.uuidJourney;

    journeyRepository.deleteJourney(uuidJourney)
    .then(() => res.status(200).json({"message": "journey deleted succesfully"})
    .catch(error => res.status(500).json({"error" : error.message})));
};