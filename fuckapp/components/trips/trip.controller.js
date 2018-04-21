const tripRepository = require('./trip.repository');

exports.addTrip = function(req, res){
    const trip = req.body.trip;
    
    tripRepository.createTrip(trip)
    .then(trip => res.status(200).json({"trip": trip}))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.modifyTrip = function(req, res){
    const trip = req.body.trip;
    const uuidTrip = req.params.uuidTrip;

    tripRepository.updateTrip(uuidTrip, trip)
    .then(() => res.status(200))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.getAllTrips = function(req, res){    
    tripRepository.getAllTrips()
    .then(trips => res.status(200).json({"trips": trips}))
    .catch(error => res.status(500).json({"error": error.message}));
};

exports.getTripByUserUuid = function(req, res){
    const uuidUser = req.params.uuidUser;

    tripRepository.getTripsByUuidUser(uuidUser)
    .then(trips => res.status(200).json({"trips": trips}))
    .catch(error => res.status(500).json({"error": error.message}));
};  

exports.getTrip = function(req, res){
    const uuidTrip = req.params.uuidTrip;

    tripRepository.getTrip(uuidTrip)
    .then(trip => res.status(200).json({"trip": trip}))
    .catch(error => res.status(500).json({"error": error.message}));
};  