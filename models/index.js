"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
//var config = (typeof(webapp_classic_config)=="undefined") ? ((typeof(app_config)=="undefined") ? cms_config : app_config) : webapp_classic_config;
var config_sequelize = {
      "username": "root",
      "password": "root",
      "pool": 200,
      "database": "management",
      //"database": "faasos_platform",
      // "host": "faasosplatform.cehawsxcetp1.us-west-2.rds.amazonaws.com",
      "host": "localhost",
      //"host": "172.16.30.244",
      "dialect": "mysql",
      "dialectOptions": {
        "multipleStatements": true
      },
      "logging": true,
      "define": {
        "timestamps": true,
        "underscored": true
      }
    }
//var config_sequelize_reader = config[config.env]['sequelize_reader'];
//var env = config[config.env];
//  var logger = require('../helpers/winston').logger;

// console.log("Database Connection config_sequelize String=>" + JSON.stringify(config_sequelize));
// console.log("Database Connection config_sequelize_reader String=>" + JSON.stringify(config_sequelize_reader));
// console.log("Database Connection process.env.FAASOS_ENV_ALB=>" + process.env.FAASOS_ENV_ALB);

// logger.info("[API][models][index][process.env.FAASOS_ENV_ALB]",process.env.FAASOS_ENV_ALB);

// if(process.env.FAASOS_ENV_ALB){

//   if(process.env.FAASOS_ENV_ALB == "reader"){

//     var sequelize = new Sequelize(config_sequelize_reader.database, config_sequelize_reader.username, config_sequelize_reader.password, config_sequelize_reader);
  
//   }else{
  
//     var sequelize = new Sequelize(config_sequelize.database, config_sequelize.username, config_sequelize.password, config_sequelize);
  
//   }

// }else{

  var sequelize = new Sequelize(config_sequelize.database, config_sequelize.username, config_sequelize.password, config_sequelize);

// }
// console.log(sequelize);
var db = {};

fs
        .readdirSync(__dirname)
        .filter(function (file) {
          return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
          var model = sequelize["import"](path.join(__dirname, file));
          db[model.name] = model;
        });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
//module.exports.env = env;
