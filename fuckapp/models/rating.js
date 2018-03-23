

module.exports = function(sequelize, DataTypes){
    return sequelize.define('rating', {
        uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        photo_ratio_uuid:{
            type: DataTypes.UUID,            
            references: {
                model: 'photos',
                key: 'uuid',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: true
        },
        points:{
            type: DataTypes.INTEGER,            
            required: false
        },
    })
};