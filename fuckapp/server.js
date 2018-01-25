  var port = process.env.PORT || 8080,
    node_env = process.env.NODE_ENV || "dev"
    config = require('./config/default.json');
    config_test = require('./config/test.json')
    db_config = require('./config/database.json')[node_env];
    Sequelize = require('sequelize');
     //Models
    models = require("./models");

var urlHost = "";

if(node_env === "dev"){
    urlHost = config.defaultUrl.DBHost;
}else{
    urlHost = config_test.testUrl.DBHost;
}
console.log("DBHost: " + db_config.database);

var sequelize = new Sequelize(
    db_config.database,
    db_config.username,
    db_config.password,
     {
        dialect: 'mysql',
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch(err => {
    console.error('Unable to connect to the database:', err)
  });

exports.sequelize = sequelize;



  //Sync Database
  models.sequelize.sync().then(function() {

      console.log('Nice! Database looks fine')

  }).catch(function(err) {

      console.log(err, "Something went wrong with the Database Update!")

  });
