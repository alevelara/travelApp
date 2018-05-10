'use strict';

const models = require('../../models');
const Journey = models.journey;
const Sequelize = require('../../server').sequelize;


exports.createJourney = function(newJourney){
    return Journey.create({
        name: newJourney.name,
        rating: newJourney.rating,        
        created_by: newJourney.created_by
    });
};

exports.getAllJourneys = function(){
    return Journey.findAll();
};

exports.getJourneysByUuidTrip = function(uuidTrip) {
    return Journey.findAll({
        where: {
            created_by: uuidTrip
        },
        include: ['Comments', 'Events']
    });
};

exports.getJourney = function(journeyUuid){
    return Journey.findOne({
        where: {
            uuid: journeyUuid
        },
        include:  ['Comments', 'Events']
    });
};

exports.updateJourney = function(uuidJourney, journey){        
        return Journey.update({
            name: journey.name,
            rating: journey.rating                     
        }, {
            where: {uuid: uuidJourney}
        }
    );      
};

