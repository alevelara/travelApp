const config = require('./config/config'),
    Sequelize = require('sequelize'),
    logger = require('./components/logger/logger'),
    driver = config.get('dbdriver'),
    env = process.env.NODE_ENV;


const sequelize = new Sequelize(
    config.get('db:' + env + ':' + driver + ':database'),
    config.get('db:' + env + ':' + driver + ':username'),
    config.get('db:' + env + ':' + driver + ':password'),
    {
        host: config.get('db:' + env + ':' + driver + ':host'),
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
