'use strict';
var d3 = require('d3');
//make an svg which responds to the location of a users click

function makeModel(){
	var model = {
		x:250, 
		y:250,
		dispatch:d3.dispatch('change')
	}

	model.set = function(o){
		if(o.x) model.x = o.x;
		if(o.y) model.y = o.y;
		model.dispatch.change(model);	//notify of a change
	}

	return model;
}

var myModel = makeModel();

//create the 'main' vis
d3.select('.app')
	.append('svg')
		.attr({
			width  : 500,
			height : 500,
			'class' : 'main-vis'
		})
	.on('click', function(){
		myModel.set({
			x:d3.mouse(this)[0],
			y:d3.mouse(this)[1]
		});
	});

myModel.dispatch.on('change.main', drawMainVis);
drawMainVis(myModel);

function drawMainVis(model){
	console.log('change', model);
	var mainVis = d3.select('.main-vis');

	mainVis.selectAll('circle')
		.data([model])
			.enter()
		.append('circle');
	
	mainVis.selectAll('circle').attr({
		cx:function(d){return d.x},
		cy:function(d){return d.y},
		r:20
	});
}

//create the 'y' vis

d3.select('.app')
	.append('svg')
		.attr({
			width:100,
			height:500,
			'class':'y-vis'
		})
	.on('click', function(){
		myModel.set({
			y:d3.mouse(this)[1]
		});
	});

myModel.dispatch.on('change.y', drawYVis);
drawYVis(myModel);

function drawYVis(model){
	var yVis = d3.select('.y-vis');

	yVis.selectAll('g')
		.data([model])
			.enter()
		.append('g')
		.append('use')
			.attr('xlink:href','graphics/arrows.svg#left');
	
	yVis.selectAll('g').attr({
		'transform':function(d){
			return 'translate(0,'+(d.y-50)+')'}
	});
};

//the 'x' vis
d3.select('.app')
	.append('svg')
		.attr({
			width:500,
			height:100,
			'class':'x-vis'
		})
	.on('click', function(){
		myModel.set({
			x:d3.mouse(this)[0]
		});
	});

myModel.dispatch.on('change.x', drawXVis);
drawXVis(myModel);

function drawXVis(model){
	var xVis = d3.select('.x-vis');

	xVis.selectAll('g')
		.data([myModel])
		.enter()
		.append('g')
		.append('use')
			.attr('xlink:href','graphics/arrows.svg#up');
	
	xVis.selectAll('g').attr({
		'transform':function(d){
			return 'translate('+(d.x-50)+',0)'}
	});
}