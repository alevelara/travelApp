const Sequelize = require('../../../server').sequelize;
const models = require('../../../models');
const tripModel = models['trip'];
const InterestModel = models['interest'];

const TABLE_NAME = "trip_interest";

/**
 * Get trip interests
 * @param tripUuid tripUuid
 * @returns {Promise}
 */
exports.getInterestsBytripUuid = function(tripUuid){
    const querySQL =
        `SELECT interest.* FROM interests interest ` +
        `LEFT JOIN ${TABLE_NAME} ui ON interest.uuid = ui.interest_uuid ` +
        `where ui.trip_uuid = :trip_uuid`;

    return Sequelize.query(querySQL,
        {
            replacements: { trip_uuid: tripUuid},
            type: Sequelize.QueryTypes.SELECT
        });
};


/**
 * Update user interest
 *
 * @param trip Trip
 * @param interests Array of Interests
 * @returns {Promise}
 */
exports.updateTripInterests = function(trip, interests) {
    return trip.setInterests(interests);
};
