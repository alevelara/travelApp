
  var port = process.env.PORT || 8080;
  var mongoose = require('mongoose');
  var config = require('config');
  require('./models/User');
  require('./models/register');
  require('./models/password');
  

mongoose.Promise = global.Promise;
exports.mongo_connection = mongoose.connect(config.DBHost, { useMongoClient: true })
        .then(() => {
            console.log('Api succesfully connected on port: ' + port);
            return mongoose.connection;
        })
        .catch(err => console.log(`Database connection error: ${err.message}`));


//console.log('Api succesfully connected on port: ' + port);