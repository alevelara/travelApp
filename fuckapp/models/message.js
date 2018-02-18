

module.exports = function(sequelize, DataTypes){
    return sequelize.define('message', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: String,
            required: false
        },
        score:{
            type: Number,
            allowNull: false
        },
        createdBy:[{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: true
        }],
        createdAt:{
            type: Date,
            allowNull: true
        },
        assignTo:[{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: true
        }],
    })
};