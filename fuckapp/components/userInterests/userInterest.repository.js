const Sequelize = require('../../server').sequelize;
const models = require('../../models');
const UserModel = models['user'];
const InterestModel = models['interest'];

const TABLE_NAME = "user_interest";

/**
 * Get user interests
 * @param userId UserId
 * @returns {Promise}
 */
exports.getInterestsByUserId = function(userUuid){
    const querySQL =
        `SELECT interest.* FROM interests interest ` +
        `LEFT JOIN ${TABLE_NAME} ui ON interest.uuid = ui.interest_uuid ` +
        `where ui.user_uuid = :user_uuid`;

    return Sequelize.query(querySQL,
        {
            replacements: { user_uuid: userUuid},
            type: Sequelize.QueryTypes.SELECT
        });
};


/**
 * Update user interest
 *
 * @param user User
 * @param interests Array of Interests
 * @returns {Promise}
 */
exports.updateUserInterests = function(user, interests) {
    return user.setInterests(interests);
};
