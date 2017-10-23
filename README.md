# Farm Moisture Sensors
This is an assignment for an interview: a web application for creating a dashboard to read and plot farm sensor data, with a login based authentication system. It has four components:
1. Login & Authentication
2. Farm Sensor Listing
3. Sensor Data Reading

## Prerequisites
* [Node.js and NPM](https://nodejs.org/en/)
* [MySQL](https://dev.mysql.com/downloads/installer/)

## Quick Setup
1. Git clone and enter directory
2. `npm install` to install the necessary packages.
3. `bower install` to install the necessary packages.
4. Update config/database.js with your MySQL database information 
5. `node scripts/dbsetup.js` to set up your database, if it doesn't already exist.
6. (Optional) To insert some test data in the database, you can run the contents of the file 'sensors_2017-10-10.sql' using the command mysql -u root -p sensors < sensors_2017-10-10.sql (You can find the password in the config file)
7. `npm start` to start up your app! Go to [http://localhost:3000](http://localhost:3000) to see it.
