'use strict';

//Modules
const crypto = require('crypto');
const ssaclAttributeRoles = require('ssacl-attribute-roles');

module.exports = function(sequelize, DataTypes) {
    ssaclAttributeRoles(sequelize);

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
            defaultValue: "",
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        hometown:{
            type: DataTypes.STRING,
            defaultValue: "",
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
            allowNull: true,
            defaultValue: null
        },
        reset_password_token:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            roles: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            roles: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            roles: false
        }

    },{
        setterMethods: {
            password: function(password){
                const buff = crypto.randomBytes(17).toString('hex');
                const hash = crypto.pbkdf2Sync(password, buff, 1000, 64, 'sha256').toString('hex');

                this.salt = buff;
                this.hash = hash;
            },
            interests: function(interests){
                this.interests = interests;
            }
        }
    });

    ssaclAttributeRoles(user);
    return user;
};