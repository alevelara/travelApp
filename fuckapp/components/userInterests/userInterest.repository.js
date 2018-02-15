
var models = require('../../models');
var userInterests = models['userInterest'];
var Sequelize = require('../../server').sequelize;
var Op = Sequelize.Op;

const utilUserInterests = require('./userInterest.utils');

exports.createActiveUserInterest = function(userId, interestId){
    return userInterests.create({
        user_id: userId,
        interest_id: interestId,
        status: 1
    });
};

exports.updateUserInterestStatus = function(userId, interestId, status){
    return userInterests.update({
        status: status,

        where:{
            user_id: userId,
            interest_id: interestId
        }
    });
};

exports.getUserInterestByPair = function(userId, userInterests){    
    for(var userInterest in userInterests){
        var querySQL = 'Select * from userinterests where user_id = :user_id AND interest_id = :interest_id';
        return Sequelize.query(querySQL, 
            {
                replacements: { 
                    user_id: userId,
                    interest_id: userInterest.interestId
                },
                type: Sequelize.QueryTypes.SELECT        
            });
            
            return utilUserInterests.checkInterests(userId, userInterest);
    }
       
};

exports.getActiveInterestsByUserId = function(userId){            
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userinterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id AND ui.status = 1';

    return Sequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: Sequelize.QueryTypes.SELECT        
    });    
};

exports.getInterestsByUserId = function(userId){            
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userinterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id';

    return Sequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: Sequelize.QueryTypes.SELECT        
    });    
};