const tripRepository = require('./trip.repository');

exports.addTrip = function(req, res){

    var trip = {
        'tittle': req.body.tittle,
        'created_by': req.params.uuid,
        'location': req.body.location,
        'places': req.body.places
    };

    tripRepository.createTrip(trip)
    .then(trip => res.status(200).json({"trip": trip}))
    .catch(error => res.status(500).json({"error": error.message}));

};