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

exports.createTrip = function(newTrip){
    return Trip.create({
        title: newTrip.title,
        city: newTrip.city,
        duration: newTrip.duration,
        created_by: newTrip.created_by
    });
};

exports.getAllTrips = function(){
    return Trip.findAll();
};

exports.getTripsByUuidUser = function(uuidUser) {
    return Trip.findAll({
        where: {
            created_by: uuidUser
        },
        include: ['Users', 'Interests', 'TripTypes']
    });
};

exports.getTrip = function(UuidTrip){
    return Trip.findOne({
        where: {
            uuid: UuidTrip
        },
        include: ['Users', 'Interests', 'TripTypes']
    });
};

exports.updateTrip = function(uuidTrip, trip){
        console.log(trip);
        return Trip.update({
            title: trip.title,
            city: trip.city,
            duration: trip.duration,
            places: trip.places            
        }, {
            where: {uuid: uuidTrip},
        }
    );      
};

