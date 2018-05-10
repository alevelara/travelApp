module.exports = function(sequelize, DataTypes){
    
    const comment = sequelize.define('comment', {       
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,  
            primaryKey: true                                
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    
    comment.associate = models => {
        comment.belongsToMany(models.trip, {
            as: 'Trips',
            foreignKey: 'comment_uuid',
            through: 'trip_comment'
        });

        comment.belongsToMany(models.journey, {
            as: 'Journeys',
            foreignKey: 'comment_uuid',
            through: 'journey_comment'
        });

        comment.belongsToMany(models.event, {
            as: 'Events',
            foreignKey: 'comment_uuid',
            through: 'event_comment'
        });
    };     

    return comment;
};