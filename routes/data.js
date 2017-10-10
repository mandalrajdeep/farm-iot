var fs = require('fs');
var Data = require('../models/data');

function init(router, passport) {
    //router.get('/data/query', findBySensor);
    router.post('/data/', create);
    router.get('/data/query', periodicDataByFarm);

}

function findBySensor(request, response, next) {
	if (request.query.sensor != null && request.query.sensor !=''){
	    Data.findBySensor(request.query.sensor, function (error, data) {
	        if (error) {
	            return response.send(error);
	        }
	        var status = data.length ? 200 : 204;
	        response.status(status).json(data);
		});
	}
}


function periodicDataByFarm(request, response, next) {
    var interval = request.query.interval;
    if (request.query.id.length > 0) {
        var id = request.query.id;
            Data.periodicDataById(id, interval, function(error, result) {
            if (error) {
                return response.send(error);
            }
            var status = (result && result._id) ? 200 : 204;
            response.send(result);  
        });
    }  
    else {
        var id = request.query.farm_id;
            Data.periodicDataByFarm(id, interval, function(error, result) {
            if (error) {
                return response.send(error);
            }
            var status = (result && result._id) ? 200 : 204;
            response.send(result);  
        });
    }
}


function create(request, response, next) {
    var attrs = request.body;
    Data.create(attrs, function (error, result) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

module.exports = init;