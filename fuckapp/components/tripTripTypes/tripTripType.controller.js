//repos
const tripTripTyperepository = require('./tripTripType.repository');
const tripRepostory = require('../trips/trip.repository');
const tripTypeRepository = require('../tripTypes/tripType.repository');
const Promise = require('promise');

/**
 * Get list of trip types filtered by tripUuid
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid ID of trip
 */
exports.getTripTripType = function(req, res){  
    const tripUuid = req.params.uuid;
    tripTripTyperepository.getTripsTypesByTripUuid(tripUuid)
        .then(tripTripType => res.status(200).json({tripType: tripTripType}))
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};

/**
 * Update Trip type
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid Trip Id
 * @param req.body.trip_type_uuid Trip Type uuid selected by the trip
 */
exports.updategetTripTripType = function(req, res){
    const tripUuid = req.params.uuid;
    const selectedTripTypesUuids = req.body.trip_types_uuids;
    
    const findTripPromise = tripRepostory.findTripByUuid(tripUuid);
    const findTripTypePromise = tripTypeRepository.findTripTypeByUuids(selectedTripTypesUuids);

    Promise.all([findTripPromise, findTripTypePromise])
        .then(results => {
            const trip = results[0];
            const selectedTripTypes = results[1];

            tripTripTypeRepository.updateTripTripType(trip, selectedTripTypes)
                .then(() => trip.getTripTripType())
                .then(savedTripTripType => res.status(200).json({tripTripType: savedTripTripType}));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};