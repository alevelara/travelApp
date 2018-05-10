module.exports = function(sequelize, DataTypes){
    const event = sequelize.define('event', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },       
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        //TODO: this field must change for associate model.
        photos:{
            type: DataTypes.UUID,            
            references: {
                model: 'photos',
                key: 'uuid',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        },
        googlePlaceId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }    
        //TODO: this field must change for associate model.
              
    });

    event.associate = models => {
        event.belongsToMany(models.trip,{
            as: 'Journey',
            foreignKey: 'event_uuid',
            through: 'journey_event'
        });

        event.belongsToMany(models.comment, {
            as: 'Comments',
            foreignKey: 'event_uuid',
            through: 'event_comment'
        });
            
    };

    return event;
};