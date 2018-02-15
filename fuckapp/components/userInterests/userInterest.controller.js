
//repos
const userRepository = require('./userInterest.repository');

exports.getUserInterests = function(req, res){  
    var userId = req.params.id;        
    userRepository.getActiveInterestsByUserId(userId)
        .then(userinterests => res.status(200).json({"interests": userinterests}))      
        .catch (error => res.status(500).json({error_message: error.message}));

}; 

exports.setUserInterests = function(req,res){
    var userId = req.params.id;
    var interests = req.params.interests;
   
    userRepository.checkActiveInterests(userId, interests)
        .then(interest => userRepository.updateUserInterest(interest))
        .then(result => res.status(200).json({"interests": userinterests})) 
        .catch(error => res.status(500).json({error_message: error.message}));
};
