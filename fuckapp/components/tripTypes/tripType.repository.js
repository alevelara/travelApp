const models = require('../../models');
const TrypType = models['tripType'];
const Sequelize = require('../../server').sequelize;


/**
 * Create TripType
 *
 * @param newTripType User to create
 */
exports.createTripType = function(newTripType) {
    return TrypType.create({
        name: newTripType.name
    });
};
