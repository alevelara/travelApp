

module.exports = function(sequelize, DataTypes){
    const interest =  sequelize.define('interest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            references: {
                model: 'photos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        }
    });


    interest.associate = models => {
        interest.hasMany(models.userInterest, {
            foreignKey: 'interest_id',
            sourceKey: 'id'
        });
    };

    return interest;
};