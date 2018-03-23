//repos
const userInterestRepository = require('./userInterest.repository');
const userRepository = require('../users/user.repository');
const interestRepository = require('../interests/interest.repository');
const Promise = require('promise');

/**
 * Get list of user interest filtered by userID
 *
 * @param req Request
 * @param res Response
 * @param req.params.id ID of user
 */
exports.getUserInterests = function(req, res){  
    const userUuid = req.params.uuid;
    userInterestRepository.getInterestsByUserId(userUuid)
        .then(userInterests => res.status(200).json({interests: userInterests}))
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
 * @param req.params.id User Id
 * @param req.body.interest_ids Interest selected by the user
 */
exports.updateUserInterests = function(req, res){
    const userUuid = req.params.uuid;
    const selectedInterestUuids = req.body.interest_uuids;
    
    const findUserPromise = userRepository.findUserByUuid(userUuid);
    const findInterestsPromise = interestRepository.findInterestsByUuid(selectedInterestUuids);

    Promise.all([findUserPromise, findInterestsPromise])
        .then(results => {
            const user = results[0];
            const selectedInterests = results[1];

            userInterestRepository.updateUserInterests(user, selectedInterests)
                .then(() => user.getInterests())
                .then(savedInterests => res.status(200).json({interests: savedInterests}));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};