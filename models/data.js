var bcrypt = require('bcrypt-nodejs');
var uuidV4 = require('uuid/v4');

var db     = require('./db');

// Set up User class
var Data = function(data) {
  var that = Object.create(User.prototype);

  that.id           = data.id;
  that.sensor       = data.sensor;
  that.result       = data.result;
  that.timestamp    = data.timestamp;
  that.moisture     = data.moisture;
  that.notes        = data.notes;

  return that;
};

// Gets a random id for this user
var generateUserId = function() {
  return uuidV4();
};

function findBySensor(sensor_id, callback) {
    db.query('SELECT * from sensors.reading WHERE sensorID = ? order by timestamp desc LIMIT 1', 
    [sensor_id], function(err, sensors) {
        //console.log(err,sensor);
        if (err) {
            return handleError(err, callback);
        }
        callback(null, sensors);
    });
  }

function periodicDataById(sensor_id, interval, callback) {
    db.query('SELECT *, DATE_FORMAT(timestamp,"%d/%m/%Y, %H:%i") AS niceDate \
     from sensors.reading WHERE sensorID = ? and timestamp > DATE_SUB(NOW(), INTERVAL ? DAY);', 
    [sensor_id, interval], function(err, readings) {
        //console.log(err,readings);
        if (err) {
            return handleError(err, callback);
        }
        callback(null, readings);
    });
  }

  function periodicDataByFarm(farm_id, interval, callback) {
    db.query('select b.sensorID, a.farmCount, DATE_FORMAT(b.timestamp,"%d/%m/%Y, %H:%i") AS niceDate, \
      b.moisture from  sensors.sensor a JOIN sensors.reading b ON a.id = b.sensorID WHERE farmID = ? \
      and b.timestamp > DATE_SUB(NOW(), INTERVAL ? DAY)', 
    [farm_id, interval], function(err, readings) {
        //console.log(err,readings);
        if (err) {
            return handleError(err, callback);
        }
        callback(null, readings);
    });
  }

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
  var newData = {
    //id: generateUserId(),
    sensorID: attrs.sensorID,
    result: attrs.result,
    timestamp: attrs.timestamp,
    moisture: attrs.moisture,
    notes: attrs.notes
  };
  db.query('INSERT INTO sensors.reading ( sensorID, result, timestamp, moisture, notes ) values (?,?,?,?,?)',
    [ newData.sensorID, newData.result, newData.timestamp, newData.moisture, newData.notes],
    function (error, reading) {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate sensor id, try again
          return create(attrs, callback);
        }
        return handleError(error, callback);
      }
      callback(null, reading);
  });
}
function handleError(error, callback) {
    // Here you can use some Logger module or create your own to log errors
  }

module.exports = {
    findBySensor: findBySensor,
    create: create,
    periodicDataById:periodicDataById,
    periodicDataByFarm: periodicDataByFarm
  };
