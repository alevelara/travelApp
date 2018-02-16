var models = require('../../models');
var UserInterest = models['userInterest'];
var Sequelize = require('../../server').sequelize;


exports.createActiveUserInterest = function(userId, interestId){
    return UserInterest.create({
        user_id: userId,
        interest_id: interestId,
        status: 1
    });
};

exports.updateUserInterestStatus = function(userId, interestId, status){
    return UserInterest.update({
        status: status,

        where:{
            user_id: userId,
            interest_id: interestId
        }
    });
};

exports.updateOrInsert = function(interest, userId) {
    const query =
        'INSERT INTO userInterests (interest_id, user_id, status) ' +
        'VALUES(:interest_id, :user_id, :status) ' +
        'ON DUPLICATE KEY UPDATE status=:status';

    return Sequelize.query(query, {
        replacements: {
            interest_id: interest.id,
            user_id: userId,
            status: interest.status},
        type: Sequelize.QueryTypes.INSERT
    });
};


exports.getActiveInterestsByUserId = function(userId){            
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userInterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id AND ui.status = 1';

    return Sequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: Sequelize.QueryTypes.SELECT        
    });    
};

exports.getInterestsByUserId = function(userId){            
    var querySQL = 'Select interest.* from interests interest ' + 
    'LEFT JOIN userInterests ui ON interest.id = ui.interest_id ' +
    'where ui.user_id = :user_id';

    return Sequelize.query(querySQL, 
    {
        replacements: { user_id: userId},
        type: Sequelize.QueryTypes.SELECT        
    });    
};
