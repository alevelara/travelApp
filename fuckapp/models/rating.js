

module.exports = function(sequelize, DataTypes){
    return sequelize.define('rating', {
        name: {
            type: DataTypes.STRING,
            required: true
        },
        photo_ratio_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'photos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        },
        points:{
            type: DataTypes.INTEGER,
            required: false
        },
    })
};