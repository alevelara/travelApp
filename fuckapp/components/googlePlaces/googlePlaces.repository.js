const places = require('../../server').googleplaces;

/**
 *
 * @param req Request
 * @param res Response
 * @returns {string}
 */
exports.searchPlaceByName = function(req,res){
    let params = {
        location: [40.7127, -74.0059],
        types: "doctor",
        radius: '500',
    };
    return places.placeSearch(params);
};


