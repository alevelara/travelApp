

module.exports = function(sequelize, DataTypes){
    return sequelize.define('city', {       
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,  
            primaryKey: true                                
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    });
};