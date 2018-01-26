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
            defaultValue: null,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true
        },
        hometown:{
            type: DataTypes.INTEGER,
            references: {
                model: 'cities',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            defaultValue: null,
            allowNull: true
        },
        photo_profile_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'photos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            defaultValue: null,
            allowNull: true
        },
        user_type:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        score:{
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        reset_password_token:{
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        hash: DataTypes.STRING,
        salt: DataTypes.STRING

    },{
        setterMethods: {
            password: function(password){
                this.salt = crypto.randomBytes(16).toString('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');        
            },
            interests: function(interests){
                this.interests = interests;
            }
        }        
    });

    
    return user;
};