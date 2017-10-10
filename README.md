# Farm Moisture Sensors
This is an assignment for an interview: a web application for creating a dashboard to read and plot farm sensor data, with a login based authentication system. It has four components:
1. Login & Authentication
2. Farm Sensor Listing
3. Sensor Data Reading

## Prerequisites
* [Node.js and NPM](https://nodejs.org/en/)
* [MySQL](https://dev.mysql.com/downloads/installer/)

## Quick setup
1. `npm install` to install the necessary packages.
2. Update config/database.js with your MySQL database information and uncomment the line in the [.gitignore](../blob/master/.gitignore) to ignore the updated config file.
3. Update some project-specific info in a few places:
  * Your project name in package.json
  * Your project debugging name in bin/www
  * Your passport secret in app.js
4. `node scripts/dbsetup.js` to set up your database, if it doesn't already exist.
5. `npm start` to start up your app! Go to [http://localhost:3000](http://localhost:3000) to see it.