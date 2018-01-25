//Modules
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hometown:{
            type: DataTypes.INTEGER,
            references: {
                model: 'cities',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: true
        },
        photo_profile_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'photos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false
        },
        user_type:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        score:{
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: true
        },
        reset_password_token:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hash: DataTypes.INTEGER,
        salt: DataTypes.INTEGER

    },{
        setterMethods: {
            password: function(password){
                this.salt = crypto.randomBytes(16).toDataTypes.DataTypes.INTEGER('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toDataTypes.DataTypes.INTEGER('hex');
            },
            interests: function(interests){
                this.interests = interests;
            }
        },
        instanceMethods: {
            validPassword: function(password) {
                var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toDataTypes.DataTypes.INTEGER('hex');
                return this.hash === hash;
            },

        }
    });

    return user;
};