
const userRepository = require('./userInterest.repository');

exports.checkInterests = function(userId, interestsSelected, interest){
    if(interest){
        if(checkInterstStatus(interestsSelected.status, interest.status)){
            return userRepository.updateUserInterestStatus(userId, interestsSelected.id, interestsSelected.status)
        }
    }else{
        return userRepository.createActiveUserInterest(userId, interestsSelected.id)
    }
};


function checkInterstStatus(InterestSelectedStatus, userInterestStatus){
    return InterestSelectedStatus.status === userInterestStatus.status;
}