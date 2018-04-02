const tripTypeRepository = require('./tripType.repository');

exports.createTripType = function(tripType){
    
    tripTypeRepository.createTripType(tripType)
    .then(console.log(tripType.name + " created succesfully"))
    .catch(console.log("ERROR creating triptype"));

};