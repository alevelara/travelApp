

module.exports = function(sequelize, DataTypes){
    return sequelize.define('interest', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
};