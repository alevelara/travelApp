

module.exports = function(sequelize, DataTypes){
    return sequelize.define('feature', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
};