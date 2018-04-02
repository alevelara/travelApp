module.exports = function(sequelize, DataTypes){    
    var tripType =  sequelize.define('tripType', {       
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,  
            primaryKey: true                                
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }    
    });
    
    tripType.associate = models => {
        tripType.belongsToMany(models.trip, {
            as: 'Trips',
            foreignKey: 'trip_type_uuid',
            through: 'trip_trip_type'});
    };

    return tripType;
};