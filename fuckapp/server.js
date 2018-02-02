  var port = process.env.PORT || 8080,
    node_env = process.env.NODE_ENV || "dev"
    config = require('./config/default.json');
    config_test = require('./config/test.json')
    db_config = require('./config/database.json')[node_env];
    Sequelize = require('sequelize');
     //Models
    models = require("./models/index");

var urlHost = "";

if(node_env === "dev"){
    urlHost = config.defaultUrl.DBHost;
}else{
    urlHost = config_test.testUrl.DBHost;
}

var sequelize = new Sequelize(
    db_config.database,
    db_config.username,
    db_config.password,
    
     {
        dialect: 'mysql',
        logging: console.log,
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
    console.log('Connection has been established successfully.')
  }).catch(err => {
    console.error('Unable to connect to the database:', err)
  });

exports.sequelize = sequelize;
  
  /*
  //Sync Database
  models.sequelize.sync({force: true}).then(function() {

      console.log('Nice! Database looks fine')

  }).catch(function(err) {

      console.log(err, "Something went wrong with the Database Update!")

  });
*/