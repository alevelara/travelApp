
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

//Arreglar, esto hay que darle una vuelta 
//Lo suyo es llamar a esta funcion dentro del bucle desde fuera y pasarle el userInterest en vez de array de intereses
//para que te devuelva una promise y poder enlazarla con la otra que viene del checkInterests.

//Lo suyo es que el checkInterests devuelva un valor y según ese valor llamar al update o el create. No realizarlo dentro del método
exports.getUserInterestByPair = function(userId, arrayUserInterests){    
    for(var userInterest in arrayUserInterests){
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