var d3 = require('d3');

function makeModel(){
	var model = {
		x:undefined, 
		y:undefined,
		dispatch:d3.dispatch('change')
	}

	model.set = function(o){
		if(!isNaN(o.x)) model.x = o.x;
		if(!isNaN(o.y)) model.y = o.y;
		model.dispatch.change(model);	//notify of a change
	}

	return model;
}

module.exports = {
	make:makeModel
}