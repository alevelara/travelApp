module.exports = function(sequelize, DataTypes){
    const userInterest =  sequelize.define('userInterest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        interest_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status:{
            type: DataTypes.INTEGER,            
            allowNull: false,
            defaultValue: 1
        }
    });  
    
    return userInterest;

};