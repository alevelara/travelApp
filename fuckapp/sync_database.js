const models = require("./models/index");
const logger = require('./components/logger/logger');

models.sequelize.sync({force: true}).then(function() {

    logger.info('Nice! Database looks fine');

}).catch(function(err) {

    logger.error(err, "Something went wrong with the Database Update!");

});