

module.exports = function(sequelize, DataTypes){
    const interest =  sequelize.define('interest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'photos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        }
    });

    /*
    ESTO PARECE QUE NO HACE FALTA

        interest.associate = models => {
            interest.belongsToMany(models.user, {
                as: 'Users',
                foreignKey: 'interestId',
                through: 'user_interest'});
        };*/

    return interest;
};