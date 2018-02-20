const Sequelize = require('../../server').sequelize;

const TABLE_NAME = "userInterests";

/**
 * Get user interests
 * @param userId UserId
 * @returns {Promise}
 */
exports.getInterestsByUserId = function(userId){
    const querySQL =
        `SELECT interest.* FROM interests interest ` +
        `LEFT JOIN ${TABLE_NAME} ui ON interest.id = ui.interest_id ` +
        `where ui.user_id = :user_id`;

    return Sequelize.query(querySQL,
        {
            replacements: { user_id: userId},
            type: Sequelize.QueryTypes.SELECT
        });
};

/**
 * Get Active interest for User
 *
 * @param userId UserId
 * @returns {Promise}
 */
exports.getActiveInterestsByUserId = function(userId){
    const querySQL =
        `SELECT interest.* FROM interests interest ` +
        `LEFT JOIN ${TABLE_NAME} ui ON interest.id = ui.interest_id ` +
        `WHERE ui.user_id = :user_id AND ui.status = 1`;

    return Sequelize.query(querySQL, {
            replacements: { user_id: userId},
            type: Sequelize.QueryTypes.SELECT
        });
};

/**
 * Update user interest
 *
 * @param interest Interest
 * @param userId UserId
 * @returns {Promise}
 */
exports.updateOrInsert = function(interest, userId) {
    const query =
        `INSERT INTO ${TABLE_NAME} (interest_id, user_id, status) ` +
        `VALUES(:interest_id, :user_id, :status) ` +
        `ON DUPLICATE KEY UPDATE status=:status`;

    return Sequelize.query(query, {
        replacements: {
            interest_id: interest.id,
            user_id: userId,
            status: interest.status},
        type: Sequelize.QueryTypes.INSERT
    });
};