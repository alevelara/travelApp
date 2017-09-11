
  var port = process.env.PORT || 3000;
  var mongoose = require('mongoose');
  require('./models/users');
  require('./models/register');
  require('./models/password');

mongoose.Promise = global.Promise;
exports.mongo_connection = mongoose.connect('mongodb://localhost/fuckApp', { useMongoClient: true })
        .then(() => {
            console.log('Api succesfully connected on port: ' + port);
            return mongoose.connection;
        })
        .catch(err => console.log(`Database connection error: ${err.message}`));


//console.log('Api succesfully connected on port: ' + port);