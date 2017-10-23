var mysql    = require('mysql');

var dbconfig = require('../config/database');

// Script for setting up database and tables
var conn = mysql.createConnection(dbconfig.connection);

conn.query('CREATE DATABASE ' + dbconfig.database);

// Set up users table
conn.query('\
  CREATE TABLE `' + dbconfig.database + '`.`users` ( \
    `id` CHAR(36) NOT NULL PRIMARY KEY, \
    `email` VARCHAR(255) NOT NULL, \
    `password` CHAR(60) NOT NULL \
  )');

conn.query('\
  CREATE TABLE `' + dbconfig.database + '`.`sensor` ( \
    `id` INT UNSIGNED NOT NULL PRIMARY KEY, \
    `farmID` CHAR(36) NOT NULL, \
    `active` BOOLEAN NOT NULL, \
    `farmCount` INT NOT NULL DEFAULT 0, \
    `notes` VARCHAR(255), \
     FOREIGN KEY(`farmID`) REFERENCES `users`(`id`) \
  )');

conn.query('\
  CREATE TABLE `' + dbconfig.database + '`.`reading` ( \
    `id` INT NOT NULL AUTO_INCREMENT, \
    `sensorID` INT UNSIGNED NOT NULL, \
    `timestamp` DATETIME NOT NULL, \
    `result` DATETIME NOT NULL, \
    `moisture` INT UNSIGNED NOT NULL, \
    `notes` VARCHAR(255), \
     PRIMARY KEY (`id`), \
     FOREIGN KEY(`sensorID`) REFERENCES `sensor`(`id`) \
  )'); 


console.log('Success! Database created.');
conn.end();
