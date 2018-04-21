const Sequelize = require('../../../server').sequelize;
const models = require('../../../models');
const tripTypeModel = models.tripTypes;

const TABLE_NAME = "trip_trip_type";

/**
 * Get trip types 
 * @param tripUuid tripUuid
 * @returns {Promise}
 */
exports.getTripsTypesByTripUuid = function(tripUuid){
    const querySQL =
        `SELECT triptype.* FROM triptypes triptype ` +
        `LEFT JOIN ${TABLE_NAME} ttp ON triptype.uuid = ttp.trip_type_uuid ` +
        `where ttp.trip_uuid = :trip_uuid`;

    return Sequelize.query(querySQL,
        {
            replacements: { trip_uuid: tripUuid},
            type: Sequelize.QueryTypes.SELECT
        });
};


/**
 * Update trip trip type
 *
 * @param trip Trip
 * @param tripTypes Array of TripTypes
 * @returns {Promise}
 */
exports.updateUserInterests = function(trip, tripTypes) {
    return trip.setTripType(tripTypes);
};
