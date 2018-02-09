/*
 *
 * @author AlbertJ
 *
 */

var
    path = require('path'),
    winston = require('winston');

module.exports = winston;

winston.init = function () {
    // Levels, lowest to highest: silly, debug, verbose, info, warn, error
    // default = 'debug'
    var logLevel = 'debug';
    var logFile = __basedir + '/fuckapp.log';

    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {level: logLevel, colorize: true, timestamp: true});
    winston.add(winston.transports.File, {filename: logFile, level: logLevel, json: false, timestamp: true});
};

module.exports.stream = {
    write: function(message, encoding){
        winston.info(message.trim());
    }
};