var config = require('./config/config'),
    Sequelize = require('sequelize'),
    logger = require('./components/logger/logger'),
    // models
    models = require("./models/index"),
    // env vars
    driver = config.get('dbdriver'),
    node_env = config.get('env'),
    port = config.get('port'),
    urlHost = "";

if (node_env === "dev") {
    urlHost = config.get('db:' + node_env + ':' + driver + ':DBHost');
} else {
    urlHost = config.get('db:' + node_env + ':' + driver + ':DBHost');
}

var sequelize = new Sequelize(
    config.get('db:' + node_env + ':' + driver + ':database'),
    config.get('db:' + node_env + ':' + driver + ':username'),
    config.get('db:' + node_env + ':' + driver + ':password'),
    {
        host: urlHost,
        dialect: driver,
        logging: logger.debug,
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.')
}).catch(err => {
    logger.error('Unable to connect to the database:', err)
});

exports.sequelize = sequelize;

  
/*
  //Sync Database
  models.sequelize.sync({force: true}).then(function() {

      logger.info('Nice! Database looks fine')

  }).catch(function(err) {

      logger.error(err, "Something went wrong with the Database Update!")

  });

 */

