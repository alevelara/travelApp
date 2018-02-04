var nconf = require('nconf'),
    yaml = require('js-yaml'),
    revalidator = require('revalidator'),
    schema = require('./schema'),
    logger = require('../components/logger/logger'),
    fs = require('fs');

// Setup logger
logger.init()

module.exports = nconf;

/**
 * Load Javascript configuration file.
 *
 * @type {Configuration}
 */
nconf.init = function (configFile) {
    nconf.argv().env();

    configFile = typeof configFile !== 'undefined' ? configFile : nconf.get("config");

    if (typeof configFile === 'undefined') {

        // neither 1 or 2 was specified, try the default
        configFile = __dirname + '/config-local.yaml';

        // If the file isn't there, we got you covered - create a default for the User
        if (!fs.existsSync(configFile)){

            var configStub = fs.readFileSync(__dirname + '/_config.local.template.yaml');
            fs.writeFileSync(configFile, configStub);

            logger.info('\x1b[31m', 'Created config-local.yaml. Update with your local settings and restart the app');

            process.exit(1);
        }
    }

    // Double check to make sure that what ever file we're using is there...
    if (!fs.existsSync(configFile)) {
        logger.error('Config file does not exist: %s', configFile);
        process.exit(1);
    }

    logger.info('Loading config file: %s', configFile);

    nconf.file({
        file: configFile,
        format: {
            parse: yaml.safeLoad,
            stringify: yaml.safeDump
        }
    });

    // Validate config against schema
    var validation = revalidator.validate(nconf.stores.file.store, schema);
    if (!validation.valid) {
        validation.errors.forEach(function (e) {
            logger.error(JSON.stringify(e, null, 2));
        });
        process.exit(1);
    } else {
        logger.info('Setup successfully');
    }
};