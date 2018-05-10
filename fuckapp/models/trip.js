'use strict';
//Modules
const ssaclAttributeRoles = require('sequelize-attribute-roles');

module.exports = function(sequelize, DataTypes) {
    
    ssaclAttributeRoles(sequelize);
    
    var trip = sequelize.define('trip', {                
        uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        title:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false                    
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false           
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false           
        },
        isEditableByParticipants:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false           
        },
        journeys:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        created_by:{
            type: DataTypes.UUID,            
            references: {
                model: 'users',
                key: 'uuid',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        }
    });

    /**
     * @param models          Information about the object.
     * @param models.tripType   Information about the object's members.
     */
    trip.associate = models => {
        trip.belongsToMany(models.tripType, {
            as: 'TripTypes',
            foreignKey: 'trip_uuid',
            through: 'trip_trip_type'
        });

        trip.belongsToMany(models.user, {
            as: 'Users',
            foreignKey: 'trip_uuid',
            through: 'trip_user'
        });

        trip.belongsToMany(models.interest, {
            as: 'Interests',
            foreignKey: 'trip_uuid',
            through: 'trip_interest'
        }); 
        
        trip.belongsToMany(models.interest, {
            as: 'Comments',
            foreignKey: 'trip_uuid',
            through: 'trip_comment'
        }); 

    };

    ssaclAttributeRoles(trip);  

    return trip;
};