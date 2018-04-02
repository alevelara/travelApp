'use strict';

//Modules
const crypto = require('crypto');
const ssaclAttributeRoles = require('sequelize-attribute-roles');

module.exports = function(sequelize, DataTypes) {
    
    ssaclAttributeRoles(sequelize);
    
    var user = sequelize.define('user', {                
        uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true            
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'usernameEmailIndex'
        },
        full_name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'usernameEmailIndex'
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
        photo_profile_uuid:{
            type: DataTypes.UUID,            
            references: {
                model: 'photos',
                key: 'uuid',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            },            
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
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            access: {
                api: false,
                self: false   
            }
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,

            access:  {
                api: false,
                self: false   
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            access:  {
                api: false,
                self: false   

            }
        }        
    },{
        setterMethods: {
            password: function(password){
                const buff = crypto.randomBytes(16).toString('hex');
                const hash = crypto.pbkdf2Sync(password, buff, 1000, 64, 'sha256').toString('hex');

                this.salt = buff;
                this.hash = hash;
            }
        }
    });

    /**
     * @param models          Information about the object.
     * @param models.interest   Information about the object's members.
     */
    user.associate = models => {
        user.belongsToMany(models.interest, {
            as: 'Interests',
            foreignKey: 'user_uuid',
            through: 'user_interest'
        });

        user.belongsToMany(models.trip, {
            as: 'Trips',
            foreignKey: 'user_uuid',
            through: 'trip_user'
        });
    };  

    ssaclAttributeRoles(user);  

    return user;
};