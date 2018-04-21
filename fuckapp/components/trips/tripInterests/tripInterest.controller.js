//repos
const tripInterestRepository = require('./tripInterest.repository');
const tripRepsitory = require('../trip.repository');
const interestRepository = require('../../interests/interest.repository');
const Promise = require('promise');

/**
 * Get list of user interest filtered by userID
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid Uuid of trip
 */
exports.getTripInterests = function(req, res){  
    const tripUuid = req.params.uuid;
    tripInterestRepository.getInterestsBytripUuid(tripUuid)
        .then(tripInterests => res.status(200).json({interests: tripInterests}))
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};

/**
 * Update User interest
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid Trip uuid
 * @param req.body.interest_uuids Interest selected by the user
 */
exports.updateTripInterests = function(req, res){
    const tripUuid = req.params.uuid;
    const selectedInterestUuids = req.body.interest_uuids;
    
    const findUserPromise = tripRepsitory.findTripByUuid(tripUuid);
    const findInterestsPromise = interestRepository.findInterestsByUuid(selectedInterestUuids);

    Promise.all([findUserPromise, findInterestsPromise])
        .then(results => {
            const trip = results[0];
            const selectedInterests = results[1];

            tripInterestRepository.updateTripInterests(trip, selectedInterests)
                .then(() => trip.getInterests())
                .then(savedInterests => res.status(200).json({interests: savedInterests}));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};