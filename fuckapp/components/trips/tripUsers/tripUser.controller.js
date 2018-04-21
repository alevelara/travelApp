//repos
const tripUserRepository = require('./tripUser.repository');
const tripRepsitory = require('../trip.repository');
const userRepository = require('../../users/user.repository');
const Promise = require('promise');

/**
 * Get list of user interest filtered by userID
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid Uuid of trip
 */
exports.getTripUsers = function(req, res){  
    const tripUuid = req.params.uuid;
    tripUserRepository.getUsersBytripUuid(tripUuid)
        .then(tripUsers => res.status(200).json({users: tripUsers}))
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};

/**
 * Update Trip Users
 *
 * @param req Request
 * @param res Response
 * @param req.params.uuid Trip uuid
 * @param req.body.user_uuids Users invited on trip
 */
exports.updateTripInterests = function(req, res){
    const tripUuid = req.params.uuid;
    const selectedUserUuids = req.body.user_uuids;
    
    const findUserPromise = tripRepsitory.findTripByUuid(tripUuid);
    const findUsersPromise = userRepository.findUserByUuid(selectedUserUuids);

    Promise.all([findUserPromise, findUsersPromise])
        .then(results => {
            const trip = results[0];
            const selectedUsers = results[1];

            tripUserRepository.updateTripUsers(trip, selectedUserUuids)
                .then(() => trip.getUsers())
                .then(savedUsers => res.status(200).json({users: savedUsers}));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};