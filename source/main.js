'use strict';
var d3 = require('d3');
var visualise = require('./visualisation.js');
var modelFactory = require('./model.js');

(function(){
	var model = modelFactory.make();
	var app = d3.select('.app1');

	app.call( visualise.iceCream, model );
	app.call( visualise.verticalLocator, model );
	app.call( visualise.horizontalLocator, model );

	model.set({
		x:250, 
		y:250
	});
})();
