module.exports = function(sequelize, DataTypes){
    const journey =  sequelize.define('journey', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: DataTypes.DOUBLE,           
            allowNull: false,
            defaultValue: 0
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
    
        journey.associate = models => {
            journey.belongsToMany(models.trip,{
                as: 'Trips',
                foreignKey: 'journey_uuid',
                through: 'trip_journey'
            });

            journey.belongsToMany(models.comment, {
                as: 'Comments',
                foreignKey: 'journey_uuid',
                through: 'journey_comment'
            });

            journey.belongsToMany(models.event, {
                as: 'Events',
                foreignKey: 'journey_uuid',
                through: 'journey_event'
            });
        };

    return journey;
};