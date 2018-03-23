

module.exports = function(sequelize, DataTypes){
    const interest =  sequelize.define('interest', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo_uuid:{
            type: DataTypes.UUID,            
            references: {
                model: 'photos',
                key: 'uuid',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        }
    });


        interest.associate = models => {
            interest.belongsToMany(models.user, {
                as: 'Users',
                foreignKey: 'interest_uuid',
                through: 'user_interest'});
        };

    return interest;
};