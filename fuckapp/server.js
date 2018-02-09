const config = require('./config/config'),
    Sequelize = require('sequelize'),
    logger = require('./components/logger/logger'),
    // models
    models = require("./models/index"),
    // env vars
    driver = config.get('dbdriver'),
    env = config.get('env');


const sequelize = new Sequelize(
    config.get('db:' + env + ':' + driver + ':database'),
    config.get('db:' + env + ':' + driver + ':username'),
    config.get('db:' + env + ':' + driver + ':password'),
    {
        host: config.get('db:' + env + ':' + driver + ':host'),
        dialect: config.get('db:' + env + ':' + driver + ':dialect'),
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
