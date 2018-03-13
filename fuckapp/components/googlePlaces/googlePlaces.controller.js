
const googlePlacesRepository = require('../googlePlaces/googlePlaces.repository');


/**
 * Get default searchByName in google places
 *
 * @param req Request
 * @param res Response
 */
exports.searchByName= function(req,res){
    googlePlacesRepository.searchPlaceByName(req,res)
       .then(result => res.status(200).json({result}));
};