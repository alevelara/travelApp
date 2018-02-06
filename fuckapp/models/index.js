"use strict";

// Init config
var config = require('../config/config');
config.init();

var fs = require("fs"),
    path = require("path"),
    Sequelize = require("sequelize"),
    env = config.get('env'),
    driver = config.get('dbdriver'),
    db = {},
    logger = require('../components/logger/logger');

var sequelize = new Sequelize(config.get('db:' + env + ':' + driver + ':database'),
    config.get('db:' + env + ':' + driver + ':username'),
    config.get('db:' + env + ':' + driver + ':password'), {
        host: config.get('db:' + env + ':' + driver + ':host'),
        dialect: config.get('db:' + env + ':' + driver + ':dialect'),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

fs
    .readdirSync(__dirname)
    .filter(function (file) {

        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        logger.debug('Adding model: ' + model.name);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;