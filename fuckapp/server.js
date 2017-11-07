  var port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    config = require('config');
    require('./models/users.models');
  

mongoose.Promise = global.Promise;
exports.getConnection = mongoose.connect(config.DBHost, { useMongoClient: true })
        .then(() => {
            console.log('Api succesfully connected on port: ' + port);
            return mongoose.connection;
        })
        .catch(err => console.log(`Database connection error: ${err.message}`));

//console.log('Api succesfully connected on port: ' + port);