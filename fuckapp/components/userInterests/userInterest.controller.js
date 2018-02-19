
//repos
const userInterestRepository = require('./userInterest.repository');

/**
 * Get list of user interest filtered by userID
 *
 * @param req Request
 * @param res Response
 * @param req.params.id ID of user
 */
exports.getUserInterests = function(req, res){  
    const userId = req.params.id;
    userInterestRepository.getActiveInterestsByUserId(userId)
        .then(userInterests => res.status(200).json({interests: userInterests}))
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "})
        });
};

/**
 * Update User interest
 *
 * @param req Request
 * @param res Response
 * @param req.params.id User Id
 * @param req.body.interests Interest selected by the user
 */
exports.updateUserInterests = function(req,res){
    const userId = req.params.id;
    const selectedInterests = req.body.interests;

    // TODO: Check that the selectedInterests exist in the Interest table
    userInterestRepository.getInterestsByUserId(userId)
        .then(userInterests => {
            processUserInterestsPromise(new Set(selectedInterests), new Set(userInterests), userId)
                .then(res.status(200).json({success: true}));
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error_message:"Server error "});
        });
};

const processUserInterestsPromise = function (selectedInterests, userInterests, userId) {
    return new Promise(function (fulfill, reject) {
        const union = new Set([...selectedInterests, ...userInterests]);

        let selectedIds = new Set();
        selectedInterests.forEach(function(selected) {
             selectedIds.add(selected.id)
        });

        union.forEach(function (item) {
            if (!selectedIds.has(item.id)) {
                item.status = 0;
            } else {
                item.status = 1;
            }
            console.log(item);
            //TODO: This should be done in one transaction
            userInterestRepository.updateOrInsert(item, userId)
                .catch(error => reject(error))
        });
        fulfill();
    })
};