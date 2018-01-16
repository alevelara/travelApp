  var port = process.env.PORT || 8080,
    node_env = process.env.NODE_ENV || "dev"
    mongoose = require('mongoose'),
    config = require('./config/default.json');
    config_test = require('./config/test.json')
    require('./components/users/users.models')
    urlHost = "";

if(node_env === "dev"){
    urlHost = config.defaultUrl.DBHost;
}else{
    urlHost = config_test.testUrl.DBHost;
}
console.log(urlHost);

mongoose.Promise = global.Promise;


exports.getConnection = mongoose.connect(urlHost, { useMongoClient: true })
        .then(() => {
            console.log('Api succesfully connected on port: ' + port);
            return mongoose.connection;
        })
        .catch(err => console.log(`Database connection error: ${err.message}`));

//console.log('Api succesfully connected on port: ' + port);