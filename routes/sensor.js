var fs = require('fs');
var Sensor = require('../models/sensor');

function init(router, passport) {
    router.get('/sensor/query', findByFarm);
    router.get('/sensor/:id', findById);
    router.post('/sensor/', create);
    router.put('/sensor/:id', update);
    
}

function findByFarm(request, response, next) {
	console.log(request.query.farm);
	if (request.query.farm != null && request.query.farm !=''){
	    Sensor.findByFarm(request.query.farm, function (error, sensors) {
	        if (error) {
	            return response.send(error);
	        }

	        var status = sensors.length ? 200 : 204;
	        response.status(status).json(sensors);
		});
	}
}

function findById(request, response, next) {
    var id = request.params.id;
    Sensor.findById(id, function (error, result) {
        if (error) {
            return response.send(error);
        }
        var status = (result && result._id) ? 200 : 204;
        response.send(result);	
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Sensor.create(attrs, function (error, result) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Sensor.flipSensor(id, attrs, function (error, rawMessage) {

        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

module.exports = init;