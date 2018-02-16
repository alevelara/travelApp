
//repos
const userInterestRepository = require('./userInterest.repository');

exports.getUserInterests = function(req, res){  
    var userId = req.params.id;
    userInterestRepository.getActiveInterestsByUserId(userId)
        .then(userInterests => res.status(200).json({interests: userInterests}))
        .catch(error => res.status(500).json({error_message: error.message}));
}; 

exports.updateUserInterests = function(req,res){
    var userId = req.params.id;
    var selectedInterests = req.body.interests;

    // TODO: Check that the selectedInterests exist in the Interest table
    userInterestRepository.getInterestsByUserId(userId)
        .then(userInterests => {
            processUserInterestsPromise(new Set(selectedInterests), new Set(userInterests), userId)
                .then(res.status(200).json({success: true}));
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error_message:"Error updating interests"});
        });
};

var processUserInterestsPromise = function (selectedInterests, userInterests, userId) {
    return new Promise(function (fulfill, reject) {
        var union = new Set([...selectedInterests, ...userInterests]);

        var selectedIds = new Set();
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