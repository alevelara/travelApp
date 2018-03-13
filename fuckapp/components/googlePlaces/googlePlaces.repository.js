const places = require('../../server').googleplaces;

/**
 *
 * @param req Request
 * @param res Response
 * @returns {string}
 */
exports.searchPlaceByName = function(req,res){
    let params = {
        location: 'pyrmont',
        radius: '500',
        types: ['store']
    };
    places.API.placeSearch(params)
        .then(result => res.status(200).json({result}));
};


