module.exports = function(sequelize, DataTypes){
    const userInterest =  sequelize.define('userInterest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        interest_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
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