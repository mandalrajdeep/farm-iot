var db     = require('./db');

// Set up User class
var Sensor = function(sensor) {
  var that = Object.create(Sensor.prototype);

  that.conn  = sensor.conn;
  that.farm  = sensor.farm;
  that.active= sensor.active;
  that.notes = sensor.notes;
  that.number= sensor.number;

  return that;
};

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function findByID(id, callback) {
    db.query('SELECT * FROM sensors.sensor WHERE id = ?', [id], function(err, sensor) {
        console.log(err, sensor);
        if (err) {
            return handleError(err, callback);
        }
        callback(null, sensor);
    });
  }

function findByFarm(farm, callback) {
    db.query('SELECT * FROM sensors.sensor WHERE farmID = ?', [farm], function(err, sensor) {
        if (err) {
            return handleError(err, callback);
        }
        //console.log(sensor);
        callback(null,sensor);
    });
  }

function findSensorsByFarm(farm, callback) {
  db.query('SELECT *, DATE_FORMAT(timestamp,"%d/%m/%Y, %H:%i") AS niceDate, DATE_FORMAT(result,"%d/%m/%Y, %H:%i") AS niceResult from sensors.reading where (sensorID, id) in (SELECT b.sensorID, max(b.id) as ts \
    FROM sensors.sensor a JOIN sensors.reading b ON a.id = b.sensorID WHERE farmID = ? \
    GROUP BY b.sensorID)', 
    [farm], function(err, sensor) {
      if (err) {
          return handleError(err, callback);
      }
      //console.log(sensor);
      callback(null,sensor);
  });
}


function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
  var newSensor = {
    id: randomIntInc(1000000,9999999),
    farmID: attrs.farmID,
    active: true,
    notes: attrs.notes,
    farmCount: attrs.farmCount
  };
  db.query('INSERT INTO sensors.sensor ( id, farmID, active, notes, farmCount ) values (?,?,?,?, ?)',
    [newSensor.id, newSensor.farmID, newSensor.active, newSensor.notes, newSensor.farmCount],
    function (error, sensor) {
      console.log(error, sensor);
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate sensor id, try again
          return create(attrs, callback);
        }
        return handleError(error, callback);
      }
      callback(null, sensor);
  });
}

function flipSensor(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    var switchSensor = {
      id: id,
      active: !attrs.active
    };
    //console.log('UPDATE sensors.sensor SET active = '+switchSensor.active+' WHERE id = '+switchSensor.id);
  db.query('UPDATE sensors.sensor SET active = ? WHERE id = ?',
    [switchSensor.active, switchSensor.id], function(err, rawMessage) {
        if (err) {
            return handleError(err, callback);
        }
        //console.log(rawMessage);
        callback(null, rawMessage);
    });
  }


function handleError(error, callback) {
    // Here you can use some Logger module or create your own to log errors
  }

module.exports = {
    findById: findByID,
    create: create,
    flipSensor: flipSensor,
    findByFarm: findByFarm,
    findSensorsByFarm: findSensorsByFarm
};
