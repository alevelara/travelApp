module.exports = function(sequelize, DataTypes){
    const userInterest =  sequelize.define('userInterest', {

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        },
        interest_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'interests',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        },
        status:{
            type: DataTypes.INTEGER,            
            allowNull: false,
            defaultValue: 1
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'interest_id']
            }]
    });
    
    return userInterest;

};