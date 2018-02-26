const models = require('../../models');
const Interest = models['interest'];

/**
 * Get all interest in database
 *
 * @returns {Promise<Array<Model>>}
 */
exports.getAllInterests = function () {
    return Interest.findAll({role: 'api'});
};

/**
 * Get all interest with id in interestIds
 *
 * @returns {Promise<Array<Model>>}
 */
exports.findInterestsById = function (interestIds) {
    return Interest.findAll({
        where: {
            id: [interestIds]
        }
    })
};