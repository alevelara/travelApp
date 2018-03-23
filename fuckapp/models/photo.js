module.exports = function(sequelize, DataTypes){
    var photo =  sequelize.define('photo', {
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true        
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    original_name:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    encoding:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    mime_type:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    destination:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    file_name:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    path:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    size:{
        type: DataTypes.INTEGER, 
        allowNull: false
    }

    });

    return photo;
};