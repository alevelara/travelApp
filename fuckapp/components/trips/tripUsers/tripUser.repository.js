const Sequelize = require('../../../server').sequelize;
const models = require('../../../models');
const tripModel = models.trip;
const InterestModel = models.user;

const TABLE_NAME = "trip_user";

/**
 * Get trip users
 * @param tripUuid tripUuid
 * @returns {Promise}
 */
exports.getUsersBytripUuid = function(tripUuid){
    const querySQL =
        `SELECT user.* FROM users user ` +
        `LEFT JOIN ${TABLE_NAME} ui ON user.uuid = ui.user_uuid ` +
        `where ui.trip_uuid = :trip_uuid`;

    return Sequelize.query(querySQL,
        {
            replacements: { trip_uuid: tripUuid},
            type: Sequelize.QueryTypes.SELECT
        });
};


/**
 * Update trip users
 *
 * @param trip Trip
 * @param users Array of Users
 * @returns {Promise}
 */
exports.updateTripUsers = function(trip, users) {
    return trip.setUsers(users);
};
