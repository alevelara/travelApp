module.exports = function(sequelize, DataTypes){
    return sequelize.define('userInterest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
    });
};