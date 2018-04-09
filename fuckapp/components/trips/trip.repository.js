'use strict';

const models = require('../../models');
const Trip = models['trip'];
const Sequelize = require('../../server').sequelize;


/**
 * Get User filtered by tripUuid
 *
 * @param tripUuid trip uuid to for filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findTripByUuid = function(tripUuid) {
    return Trip.findOne({
        where: {
            uuid: tripUuid
        },
        include: 'TripTypes'
    });
};