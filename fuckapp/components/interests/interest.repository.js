var models = require('../../models');
var Interest = models['interest'];

exports.getAllInterests = function () {
    return Interest.findAll({role: 'api'});
};