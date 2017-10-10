var auth = require('../utils/auth');
var Sensor = require('../models/sensor');
var Data = require('../models/data');
var Type = require('type-of-is');


// Main routes for app
module.exports = function(app) {

  app.get('/', function(req, res, next) {

    res.render('index');

  });

  app.get('/profile', auth.requireLogin, function(req, res, next) {
    //var str = { "farm" :  req.user.id  };
    //console.log(str);
   
    farmID = req.user.id;
    sensorData = null;
    Sensor.findSensorsByFarm(farmID, function(error, sensors){
      if (error) {
        return res.send(error);
      }
      sensorData = JSON.parse(JSON.stringify(sensors));
      //console.log("final farm data: ", sensorData);
      res.render('profile', { farm_id: farmID, sensor_data: sensorData});
    });
  });

  app.get('/settings', auth.requireLogin, function(req, res, next) {

    farmID = req.user.id;
    sensorList = null;
    Sensor.findByFarm(farmID, function(error, sensors){
      if (error) {
        return res.send(error);
      }
      sensorList = JSON.parse(JSON.stringify(sensors));
      //console.log("final farm data: ", sensorList);
      res.render('settings', { farm_id: farmID, sensor_list: sensorList, user: req.user});
    });
  });

/***
app.get('/graph', auth.requireLogin, function(req, res, next) {

    farmID = req.user.id;
    sensorList = null;
    Sensor.findByFarm(farmID, function(error, sensors){
      if (error) {
        return res.send(error);
      }
      sensorList = JSON.parse(JSON.stringify(sensors));
      //console.log("final farm data: ", sensorList);
      res.render('graph', { farm_id: farmID, sensor_list: sensorList});
    });
  });

*/
   app.get('/graph', auth.requireLogin, function(req, res, next) {

    farmID = req.user.id;
    interval = 360;
    dataList = [];
    sensorList = []; //array of sensors
    tempList = [];
    farmCount = "";
    var reads = [];
    Data.periodicDataByFarm(farmID, interval, function(error, data){
      if (error) {
        return res.send(error);
      }
      dataList = JSON.parse(JSON.stringify(data));  
      console.log(dataList);  
      sensorDict = {}
      for (index in dataList) {
        if (dataList[index]['sensorID'] in sensorDict) {
          sensorDict[dataList[index]['sensorID']]['readings'].push(
            {'niceDate': dataList[index]['niceDate'], 'moisture': dataList[index]['moisture'] }
          );
        } else {
          sensorDict[dataList[index]['sensorID']] = {'farmCount': dataList[index]['farmCount'], 'readings': []};
          sensorDict[dataList[index]['sensorID']]['readings'].push(
            {'niceDate': dataList[index]['niceDate'], 'moisture': dataList[index]['moisture'] }
          );
        }

      }
      console.log(sensorDict);         
      for (var key in sensorDict) {
        var currSensorData = sensorDict[key];
        currSensorData['readings'] = currSensorData['readings'].sort(function (a, b) {
          return a.niceDate.localeCompare(b.niceDate);
        });
        currSensorData['xs'] = []
        currSensorData['ys'] = []
        for (reading in currSensorData['readings']){
          currSensorData['xs'].push(currSensorData['readings'][reading]['niceDate']);
          currSensorData['ys'].push(currSensorData['readings'][reading]['moisture']);
        }
      }
      console.log(sensorDict);         
      res.render('graph', { farm_id: farmID, read_list: sensorDict , user: req.user});

    });
  });
};