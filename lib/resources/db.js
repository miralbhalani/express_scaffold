var config = require("../../config/config.js");

var Sequelize = require("sequelize");

var db = {};


config.db.mysql.dbHost.logging = function (str) {
    console.log(str)
}

db.sequelize = new Sequelize(config.db.mysql.dbName,
                       config.db.mysql.dbUserName,
                       config.db.mysql.dbPassword,
                       config.db.mysql.dbHost);
db.Sequelize = Sequelize

// var db = require('mongoskin').db(config.db);

module.exports = db;